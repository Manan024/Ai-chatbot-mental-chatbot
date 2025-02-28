import { useState } from "react";
import { Headset, MessageCircle, Phone, X } from "lucide-react";

function PersonalizedSupport() {
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  return (
    <div className="relative">
      {/* Main Button */}
      <button
        onClick={() => setIsSupportOpen(!isSupportOpen)}
        className="flex items-center gap-3 p-3 w-full rounded-lg cursor-pointer bg-white shadow-md transition-all transform hover:scale-105 hover:bg-indigo-500 hover:text-white font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <Headset className="text-blue-500" />
        <span>Personalized Support</span>
      </button>

      {/* Support Options */}
      {isSupportOpen && (
        <div className="absolute top-14 left-0 w-full flex flex-col items-end space-y-2 bg-white shadow-lg p-4 rounded-lg">
          {/* <button className="flex items-center gap-3 p-3 w-full rounded-lg bg-indigo-500 text-white shadow-md transition-all transform hover:scale-105">
            <MessageCircle className="text-white" />
            <span>Chat with us</span>
          </button> */}

          <button
            className="flex items-center gap-3 p-3 w-full rounded-lg bg-green-500 text-white shadow-md transition-all transform hover:scale-105"
            onClick={() => window.open("https://wa.me/7976652501", "_blank")}
          >
            <Phone className="text-white" />
            <span>Connect on WhatsApp</span>
          </button>

          {/* Close Button */}
          <button
            onClick={() => setIsSupportOpen(false)}
            className="p-3 bg-red-500 text-white rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            <X />
          </button>
        </div>
      )}
    </div>
  );
}

export default PersonalizedSupport;
