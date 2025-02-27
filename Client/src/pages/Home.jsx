import ChatContainer from "../components/ChatContainer"
import ChatInput from "../components/ChatInput"
import NochatSelected from "../components/NochatSelected"
import Sidebar from "../components/Sidebar"
import useMessageStore from "../store/MessageStore"



function Home() {
  const { selectedUsers } = useMessageStore()

  return (
    <div className="h-screen bg-base-200 flex justify-center items-center ">
      <div className="bg-base-100 rounded-lg w-full shadow-lg max-w-7xl h-[calc(100vh-8rem)] ">
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