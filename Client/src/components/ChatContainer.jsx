import { useEffect, useRef, useState } from "react";
import useMessageStore from "../store/MessageStore";
import ChatInput from "./ChatInput";
import { Mic, Loader2 } from "lucide-react";

function ChatContainer() {
  const { messages, getMessages, sendMessage } = useMessageStore(); // Zustand functions
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [tempMessages, setTempMessages] = useState([]); // Temporary messages (for spinner)

  useEffect(() => {
    getMessages(); // Fetch messages initially

    // Fetch messages every 2 seconds to keep chat updated
    const interval = setInterval(() => {
      getMessages();
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [getMessages]);

  useEffect(() => {
    // Auto-scroll when messages update
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, tempMessages]); // Scroll when messages or temp messages change

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    setLoading(true);

    // Add temporary loading message to UI
    const newTempMessage = { message: text, reply: "Thinking...", createdAt: new Date() };
    setTempMessages((prev) => [...prev, newTempMessage]);

    await sendMessage(text); // Send message to backend
    await getMessages(); // Fetch new messages after sending

    // Remove temporary loading message
    setTempMessages([]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#e2ddda76] w-full">
      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 space-y-4 overflow-y-auto bg-[#ffc2991a] text-white"
      >
        {/* Show actual messages */}
        {[...messages, ...tempMessages].map((msg, index) => (
          <div key={index} className="flex flex-col space-y-2">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-blue-300 text-black px-4 py-2 rounded-lg max-w-xs">
                <p>{msg.message}</p>
                <span className="text-xs text-black">{new Date(msg.createdAt).toLocaleTimeString()}</span>
              </div>
            </div>

            {/* AI Reply */}
            <div className="flex justify-start">
              <div className="bg-green-400 text-black px-4 py-2 rounded-lg max-w-xs flex items-center gap-2">
                {/* Show loader for temporary reply */}
                {msg.reply === "Thinking..." ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5 text-black" />
                    <p>{msg.reply}</p>
                  </>
                ) : (
                  <p>{msg.reply}</p>
                )}
                <span className="text-xs text-black">{new Date(msg.createdAt).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex items-center p-4 space-x-2">
       
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default ChatContainer;
