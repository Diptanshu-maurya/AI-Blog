import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { useNavigate } from 'react-router'


function Logout() {
  const {logout}=useContext(AuthContext)
  const nav=useNavigate()

   useEffect(()=>{

   logout();
   nav('/')

  

   },[])
  return (
    <div>
      logout
    </div>
  )
}

export default Logout
