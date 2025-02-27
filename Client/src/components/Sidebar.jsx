import { useState } from "react";
import { ChartBar, Users, MessageCircle, Phone, Clipboard } from "lucide-react";  // Added MessageCircle for chat icon

function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to manage modal visibility

  // Function to open the modal
  const openCallModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeCallModal = () => setIsModalOpen(false);

  return (
    <aside className="h-full w-24 lg:w-72 border-r border-base-300 flex flex-col bg-base-100 transition-all duration-200 p-5">
      {/* Sidebar Header */}
      <div className="bg-base-100 border-b border-base-300 w-full p-5 mb-4">
        <div className="flex items-center gap-2">
          <ChartBar className="text-blue-500" />  {/* Blue color for icon */}
          <p className="font-bold  text-black">Explore</p>
        </div>
      </div>

      {/* Search/Start Chat Section */}
      <div className="flex flex-col gap-3 px-2 mb-4">
        <button className="flex items-center gap-2 p-3 text-black hover:bg-gray-200 rounded-md transition-all duration-200">
          <Clipboard className="text-blue-500" />
          <span>Quick Survey</span>
        </button>
      </div>

      {/* Additional Features Section */}
      <div className="flex flex-col gap-3 mt-4">
        {/* Have a Talk Button */}
        <button
          className="flex items-center gap-2 p-3 text-black hover:bg-gray-200 rounded-md transition-all duration-200"
          onClick={openCallModal}
        >
          <Phone className="text-blue-500" />
          <span>Have a Talk</span>
        </button>

        <button className="flex items-center gap-2 p-3 text-black hover:bg-gray-200 rounded-md transition-all duration-200">
          <Users className="text-blue-500" />
          <span>Community Support</span>
        </button>
        <button className="flex items-center gap-2 p-3 text-black hover:bg-gray-200 rounded-md transition-all duration-200">
          <MessageCircle className="text-blue-500" />
          <span>Feedback</span>
        </button>
      </div>

      {/* Modal for Call Options */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h3 className="text-xl font-bold mb-4">Choose a Call Option</h3>
            <div className="flex flex-col gap-4">
              <button
                className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => alert("Starting Video Call...")}  // Replace with actual call logic
              >
                Start Video Call
              </button>
              <button
                className="p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
                onClick={() => alert("Starting Voice Call...")}  // Replace with actual call logic
              >
                Start Voice Call
              </button>
              <button
                className="p-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={closeCallModal}  // Close modal
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
