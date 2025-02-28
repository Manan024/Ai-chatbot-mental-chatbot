import ChatContainer from "../components/ChatContainer"
import ChatInput from "../components/ChatInput"
import Navbar from "../components/Navbar"
import NochatSelected from "../components/NochatSelected"
import Sidebar from "../components/Sidebar"
import useMessageStore from "../store/MessageStore"



function Home() {
  const { selectedUsers } = useMessageStore()

  return (
    <div className="h-screen  bg-[#c98a6011] flex justify-center items-center ">
      <div className="bg-base-100 h-screen w-screen rounded-lg  shadow-lg max-w-7xl  ">
        <div className="flex  h-full w-full rounded-lg overflow-hidden">
          <Sidebar />
          <ChatContainer />
          {/* {selectedUsers ? <ChatContainer /> : <NochatSelected />} */}
        </div>
      </div>
    </div>
  )
}

export default Home