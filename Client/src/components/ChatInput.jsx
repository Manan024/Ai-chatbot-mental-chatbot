import { useRef, useState } from "react";
import { Image, Mic, Send, Smile } from "lucide-react";
import useMessageStore from "../store/MessageStore";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function ChatInput() {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isListening, setIsListening] = useState(false); // Add listening state
  const fileInputRef = useRef();

  const { sendMessages } = useMessageStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendMessages({ text: text.trim() });
      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    
    recognition.start();
    setIsListening(true); // Set listening state when starting

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setText(speechText);
      setIsListening(false); // Clear listening state when result received
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false); // Clear listening state on error
    };
  };

  const handleEmojiSelect = (emoji) => {
    setText((prev) => prev + emoji.native);
  };

  return (
    <div className="w-full p-5 relative">
      {/* Mic Button */}
      <button
        onClick={handleVoiceInput}
        className="bg-blue-500 text-orange-200 p-2 rounded-full hover:bg-red-600 transition-all duration-200 flex items-center justify-center"
      >
        <Mic className="w-6 h-6" />
      </button>

      {showEmojiPicker && (
        <div className="absolute bottom-14 left-10 sm:left-0 z-10">
          <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2 mt-4">
        <div className="flex-1 flex gap-2 relative">
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="btn btn-circle bg-base-100 text-[#A7703B]"
          >
            <Smile size={20} />
          </button>

          {/* Modified input with listening state */}
          <input
            type="text"
            className="w-full input bg-white m-2 p-2 input-bordered rounded-lg input-sm"
            placeholder="Ask Anything..."
            value={isListening && text === "" ? "Listening..." : text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-circle hidden sm:flex bg-base-100 text-[#A7703B]"
          >
            <Image size={20}  />
          </button>
        </div>

        <button 
          className="btn btn-circle btn-sm text-[#A7703B]" 
          type="submit" 
          disabled={!text.trim() || text === "Listening..."} // Prevent sending "..."
        >
          <Send size={22}  />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;