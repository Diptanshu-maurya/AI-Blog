import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const nav=useNavigate();

  const {user}=useContext(AuthContext)

  useEffect(()=>{

    if( !user || Object.keys(user).length === 0){
      console.log("hello")
      
      nav('/login')
    }
     
  },[])
  console.log("user",user)
  




  return (
    <div className="flex  p-6 bg-teal-200 min-h-screen">
      <nav className="w-1/6 bg-teal-100 p-4 mr-10 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/mypost"
              className="block px-4 py-2 rounded border-2 border-teal-400 hover:bg-teal-300 transition-colors"
            >
              My Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myprofile"
              className="block px-4 py-2 rounded hover:bg-teal-300 transition-colors border-2 border-teal-400"
            >
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className="block px-4 py-2 rounded hover:bg-teal-300 transition-colors border-2 border-teal-400"
            >
              Logout
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/resetpassword"
              className="block px-4 py-2 rounded hover:bg-teal-300 transition-colors border-2 border-teal-400"
            >
              Reset Password
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/changepassword"
              className="block px-4 py-2 rounded hover:bg-teal-300 transition-colors border-2 border-teal-400"
            >
              Change Password
            </NavLink>
          </li>
        </ul>
      </nav>
      <main className="w-3/4 p-6 bg-teal-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Content</h2>
        {/* Add your content here */}
        <div>Show my post</div>
      </main>
    </div>
  );
}

export default Dashboard;
