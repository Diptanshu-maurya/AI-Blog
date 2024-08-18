import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : {}
  );
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [queryset, setQueryset] = useState("");
  const [loading,setLoading]=useState(true)

  async function login(data) {
    console.log("submitted", data);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/api/token/",
        {
          username: data.username,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setAuthTokens(response.data);
        setUser(jwtDecode(response.data.access));
        localStorage.setItem("authTokens", JSON.stringify(response.data));
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.error("error", error.response.data);
    }
  }

  const logout = () => {
    localStorage.removeItem("authTokens");
    setAuthTokens(null);
    setUser({});
  };
  const handleSearch = (query) => {
    console.log("hye", query);
    setQueryset(query);
  };
  async function updateToken() {

   // console.log("update token is called")
    const response = await axios.post(
      "http://127.0.0.1:8000/auth/api/token/refresh/",
      {
        refresh: authTokens.refresh,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));
      localStorage.setItem("authTokens", JSON.stringify(response.data));
    } else {
       logout();
    }
  }    

  useEffect(()=>{
    let fourMinutes=1000*60*4;
   let interval= setInterval(()=>{
       if(authTokens){
        updateToken()
       }
    },fourMinutes)

    return ()=> clearInterval(interval)

  },[authTokens,loading])






  return (
    <AuthContext.Provider
      value={{ handleSearch, login, logout, queryset, setQueryset, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
