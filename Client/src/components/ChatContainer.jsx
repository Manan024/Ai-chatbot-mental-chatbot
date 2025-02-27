import { useEffect, useRef, useState } from "react";
import useMessageStore from "../store/MessageStore";
import ChatInput from "./ChatInput";
import { Mic } from "lucide-react";  // You can use a Mic icon from lucide-react for the voice button

function ChatContainer() {
  const { messages, getMessages } = useMessageStore();
  const chatContainerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    getMessages();
  }, [getMessages, messages]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer && isAtBottom) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages, isAtBottom]);

  const handleScroll = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      setIsAtBottom(chatContainer.scrollHeight - chatContainer.scrollTop === chatContainer.clientHeight);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 space-y-4 overflow-y-auto bg-base-100 text-white"
        onScroll={handleScroll}
      >
        {messages.map((msg, index) => (
          <div key={index} className="flex flex-col space-y-2">
            {/* User Message (Align Right) */}
            <div className="flex justify-end">
              <div className="bg-yellow-200 text-black px-4 py-2 rounded-lg max-w-xs">
                <p>{msg.message}</p>
                <span className="text-xs text-black">{new Date(msg.createdAt).toLocaleTimeString()}</span>
              </div>
            </div>

            {/* AI Reply (Align Left) */}
            <div className="flex justify-start">
              <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg max-w-xs">
                <p>{msg.reply}</p>
                <span className="text-xs text-black">{new Date(msg.createdAt).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center p-4 space-x-2">
        {/* Voice Button (Currently non-functional) */}
        <button
          onClick={() => {}}
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200"
        >
          <Mic className="w-6 h-6" />
        </button>

        {/* Chat Input */}
        <ChatInput />
      </div>
    </div>
  );
}

export default ChatContainer;
