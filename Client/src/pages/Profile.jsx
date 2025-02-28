import useAuthStore from "../store/AuthStore"

export default function Profile() {
  const { authUser } = useAuthStore()


  return (
    <div className="h-screen bg-base-200 flex justify-center items-center">
      <div className=" flex border border-black bg-base-100 justify-center items-center h-[calc(100vh-10rem)] w-full gap-5  shadow-lg ">
        <div>
          <img
            src={authUser.profilePicture || "/images/th.jpg"}
            alt=""
            className="w-30 h-30 rounded-lg"
          />
        </div>
        <div className="flex flex-col  gap-5">

          <input
            type="text"
            value={authUser.fullName}
            className="p-4 rounded-lg "
            name=""
            id="" />
          <input
            type="email"
            value={authUser.email}
            className="p-4 rounded-lg  "
            name=""
            id="" />
        </div>
      </div>
    </div>
  )
}
