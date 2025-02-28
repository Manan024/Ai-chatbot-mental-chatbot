import { useEffect, useRef, useState } from "react";
import useMessageStore from "../store/MessageStore";
import ChatInput from "./ChatInput";
import { Loader2 } from "lucide-react";

function ChatContainer() {
  const { messages, getMessages, sendMessage } = useMessageStore();
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [tempMessages, setTempMessages] = useState([]);

  // Track pending messages
  const pendingMessages = useRef({});

  useEffect(() => {
    getMessages();
    const interval = setInterval(getMessages, 1000);
    return () => clearInterval(interval);
  }, [getMessages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, tempMessages]);

  // Match real responses with temporary messages
  useEffect(() => {
    const newTempMessages = tempMessages.filter(tempMsg => {
      const hasResponse = messages.some(msg => 
        msg.message === tempMsg.message && 
        msg.reply !== "Thinking..." &&
        new Date(msg.createdAt) > new Date(tempMsg.createdAt)
      );
      return !hasResponse;
    });
    
    if (newTempMessages.length !== tempMessages.length) {
      setTempMessages(newTempMessages);
    }
  }, [messages, tempMessages]);

  const handleSendMessage = async (text) => {
    if (!text.trim() || loading) return;
    
    setLoading(true);
    const tempId = Date.now();
    
    // Add temporary message
    setTempMessages(prev => [
      ...prev,
      {
        message: text,
        reply: "Thinking...",
        createdAt: new Date(),
        tempId
      }
    ]);

    try {
      await sendMessage(text);
      // Track pending message
      pendingMessages.current[tempId] = true;
    } finally {
      setLoading(false);
    }
  };

  // Combine and sort messages
  const allMessages = [...messages, ...tempMessages].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <div className="flex flex-col h-full bg-[#e2ddda76] w-full">
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 space-y-4 overflow-y-auto bg-[#ffc2991a] text-white"
      >
        {allMessages.map((msg) => (
          <div key={msg.id || msg.tempId} className="flex flex-col space-y-2">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-blue-300 text-black px-4 py-2 rounded-lg max-w-xs">
                <p>{msg.message}</p>
                <span className="text-xs text-black">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex justify-start">
              <div className="bg-green-400 text-black px-4 py-2 rounded-lg max-w-xs flex items-center gap-2">
                {msg.reply === "Thinking..." ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5 text-black" />
                    <p>Thinking...</p>
                  </>
                ) : (
                  <p>{msg.reply}</p>
                )}
                <span className="text-xs text-black">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center p-4 space-x-2">
        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </div>
    </div>
  );
}

export default ChatContainer;