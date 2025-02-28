import { useRef, useState } from "react";
import { Image, Mic, Send, Smile } from "lucide-react";
import useMessageStore from "../store/MessageStore";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function ChatInput() {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef();

  const { sendMessages } = useMessageStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendMessages({ text: text.trim() });
      setText(""); // Clear input after sending
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

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setText(speechText); // Set recognized text
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
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

      {/* Emoji Picker (conditionally displayed) */}
      {showEmojiPicker && (
        <div className="absolute bottom-14 left-10 sm:left-0 z-10">
          <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
        </div>
      )}

      {/* Form for text & file input */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2 mt-4">
        <div className="flex-1 flex gap-2 relative">
          {/* Emoji Button */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="btn btn-circle bg-base-100 text-zinc-400"
          >
            <Smile size={20} />
          </button>

          {/* Text Input */}
          <input
            type="text"
            className="w-full input bg-white m-2 p-2 input-bordered rounded-lg input-sm"
            placeholder="Ask Anything..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-circle hidden sm:flex bg-base-100 text-zinc-400"
          >
            <Image size={20} />
          </button>
        </div>

        {/* Send Button */}
        <button className="btn btn-circle btn-sm" type="submit" disabled={!text.trim()}>
          <Send size={22} />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
