import { Routes, Route, Navigate } from 'react-router'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Settings from '../pages/Settings'
import Profile from '../pages/Profile'
import useAuthStore from '../store/AuthStore'
import Blog from '../pages/Blog'
import BlogDetail from '../components/BlogDetails'
import Support from '../pages/Support'

function CustomRoutes() {
    const { authUser } = useAuthStore()


    return (
        <Routes>
            <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />} />
            <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to={"/"} />} />
            <Route path="/login" element={!authUser ? <Login /> : <Navigate to={"/"} />} />
            <Route path="/setting" element={<Settings />} />
            <Route path="/profile" element={authUser ? <Profile /> : <Navigate to={"/login"} />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/support" element={<Support />} />
        </Routes>
    )
}

export default CustomRoutes