import { X } from "lucide-react";
import useMessageStore from "../store/MessageStore"

function ChatHeader() {
  const { selectedUsers, setSelectedUsers } = useMessageStore()
    ;
  

  return (

    <div className="flex justify-between items-center flex-1 px-4 max-h-20 min-w-full ">
      <div className="flex items-center gap-3 ">
        <img
          src={selectedUsers.profilePicture || "/images/th.jpg"}
          alt={selectedUsers.name}
          className="w-12 h-12 object-cover rounded-full"
        />
        <div className="text-left min-w-0">
          <div className="font-medium truncate pb-5 w-full max-w-[150px]">{selectedUsers.fullName}</div>
        </div>
      </div>
      <button onClick={()=> setSelectedUsers("")}>
        <X className="size-4" />
      </button>
    </div>

  )
}

export default ChatHeader