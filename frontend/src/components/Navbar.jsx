import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';


function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
 const {handleSearch,setQueryset}=useContext(AuthContext)
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setQueryset(searchQuery)
    setSearchQuery('')
    
    navigate('/');
    
    
  };

  return (
    <div className="bg-teal-600 flex items-center justify-between px-8 py-4 text-xl font-serif font-medium shadow-md">
      <div>
        <NavLink
          to="/"
          className="text-white hover:text-teal-200 transition-colors"
        >
          BLOG
        </NavLink>
      </div>

      <div className="flex space-x-4">
      <NavLink
          to="/create-post"
          className="text-white flex items-center space-x-4 border-b-2 border-transparent hover:border-teal-200 transition-colors"
        >
          
          Create
        </NavLink>
        <NavLink
          to="/dashboard"
          className="text-white flex items-center space-x-4 border-b-2 border-transparent hover:border-teal-200 transition-colors"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/login"
          className="text-white flex items-center space-x-4 border-b-2 border-transparent hover:border-teal-200 transition-colors"
        >
          Login
        </NavLink>
        <NavLink
          to="/registration"
          className="text-white flex items-center space-x-4 border-b-2 border-transparent hover:border-teal-200 transition-colors"
        >
          Registration
        </NavLink>
      </div>

      <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="px-6 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-teal-400"
        />
        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-1 rounded-md hover:bg-teal-600 transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Navbar;
