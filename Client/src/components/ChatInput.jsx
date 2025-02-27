import {  useRef, useState } from "react"
import { Image, Send } from "lucide-react"
import useMessageStore from "../store/MessageStore"


function ChatInput() {
    const [text, setText] = useState("")

    const filInputRef = useRef()

    const {sendMessages } = useMessageStore()



    const handleSendMessage = async (e) => {
        e.preventDefault()
        try {
            await sendMessages({
                text: text.trim(),
            })

            setText("")

        } catch (error) {
            console.log(error);

        }
    }


    return (
        <div className="w-full p-5">

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className=" flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm"
                        placeholder="Ask Anything..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <input
                        type="file"
                        accept="image/*"
                        ref={filInputRef}
                        // onChange={handleImageChange}
                        className="hidden items-center"
                    />

                    <button
                        type="button"
                        onClick={() => filInputRef.current?.click()}
                        className="btn btn-circle hidden bg-base-100 sm:flex text-zinc-400"
                    >
                        <Image size={20} />
                    </button>
                </div>
                <div >
                    <button
                        className="btn btn-circle btn-sm"
                        type="sumbit"
                        disabled={!text.trim()}
                    >
                        <Send size={22} />
                    </button>

                </div>

            </form>

        </div>
    )
}

export default ChatInput