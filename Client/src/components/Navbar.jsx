import { Link } from "react-router";
import { LogOut, Settings, User, MessageSquare } from "lucide-react";
import useAuthStore from "../store/AuthStore";

function Navbar() {
    const { authUser, logout } = useAuthStore();

    return (
        <div className="flex w-full bg-base-100 bg-[#1E151E] justify-between items-center p-3">
            {/* Chat App Button */}
            <Link to="/" className="flex items-center gap-2 text-[#A7703B] hover:text-[#855c2c]">
                <MessageSquare className="w-6 h-6" />
                <span className="font-bold text-2xl">Hope</span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-6 text-[#A7703B]">
                {/* Settings */}
                <Link to="/setting" className="flex items-center gap-2 hover:text-[#855c2c]">
                    <Settings className="w-6 h-6" />
                    <span>Settings</span>
                </Link>

                {/* Profile */}
                {authUser && (
                    <Link to="/profile" className="flex items-center gap-2 hover:text-[#855c2c]">
                        <User className="w-6 h-6" />
                        <span>Profile</span>
                    </Link>
                )}

                {/* Logout */}
                {authUser && (
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-[#855c2c] hover:text-[#855c2c] transition"
                    >
                        <LogOut className="w-6 h-6" />
                        <span>Logout</span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default Navbar;
