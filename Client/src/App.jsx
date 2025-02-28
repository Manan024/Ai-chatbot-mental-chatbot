import { useEffect } from "react"
import Navbar from "./components/Navbar"
import CustomRoutes from "./routes/Routes"
import useAuthStore from "./store/AuthStore"
import useThemeStore from "./store/ThemeStore"
import { Toaster } from 'react-hot-toast';


function App() {

  const { checkAuth, authUser } = useAuthStore()
  const { theme } = useThemeStore()
  // console.log(authUser);


  useEffect(() => {
    checkAuth()
  }, [checkAuth])



  return (
    <div data-theme={theme}  >
      <Navbar />
      <CustomRoutes />
      <Toaster />
    </div>
  )
}

export default App
