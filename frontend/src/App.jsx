

import Navbar from "./components/Navbar"
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import CreatePost from "./components/CreatePost"
import Home from "./components/Home"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Registration from "./components/Registration"
import DetailPost from "./components/DetailBlogPost"
import MyPost from "./components/MyPost"
import MyProfile from "./components/MyProfile"
import ResetPassword from "./components/ResetPassword"
import Logout from "./components/Logout"
import ChangePassword from "./components/ChangePassword"
import { AuthProvider } from "./components/context/AuthContext"

function App() {
  

  return (
   
   <div>
    <AuthProvider>
    <BrowserRouter>
    <Navbar></Navbar>
    <Routes>
      <Route path="/create-post" element={<CreatePost/>}></Route>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/logout" element={<Logout/>}></Route>
      <Route path="/mypost" element={<MyPost/>}></Route>
      <Route path="/myprofile" element={<MyProfile/>}></Route>
      <Route path="/resetpassword" element={<ResetPassword/>}></Route>
      <Route path="/changepassword" element={<ChangePassword/>}></Route>
      <Route path="/registration" element={<Registration/>}></Route>
      <Route path="/single-post/:id" element={<DetailPost/>}></Route>
    </Routes>



    </BrowserRouter>
    </AuthProvider>
    
   </div>
      
       
  )
}

export default App
