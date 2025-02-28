import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useMessageStore = create((set) => ({
  messages: [],
  selectedUsers: "",
  isUserLoading: false,
  isMessagesLoading: false,

  getMessages: async () => {
    try {
      set({ isMessagesLoading: true });
      const response = await axiosInstance.get(`/chat/message`);
      // console.log(response);
      set({ messages: response.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  setSelectedUsers: (selectedUsers) => {
    set((state) => ({ selectedUsers }));
  },
  sendMessages: async (formData) => {
    try {
      const response = await axiosInstance.post(`/chat/send`, formData);
      // console.log(response);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));

export default useMessageStore;
