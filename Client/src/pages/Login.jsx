import { useState } from "react";
import toast from "react-hot-toast";
import useAuthStore from "../store/AuthStore";
import { useNavigate } from "react-router";

export default function Login() {
  const { login } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      login(formData, navigate);
    }
  };

  return (
    <div className="flex items-center bg-base-200 justify-center min-h-screen bg-[#1E151E]">
      <div className="bg-[#1E151E] border bg-base-200 border-[#A16C38] p-8 rounded-2xl shadow-lg w-96">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#A16C38]">Welcome Back</h2>
          <p className="text-[#A16C38]">Sign in to continue</p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[#A16C38] text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Email..."
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 text-bg-base-200 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block  text-[#A16C38] text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 text-bg-base-200 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button type="submit" className="w-full mt-4 bg-blue-600 text-bg-base-200 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
