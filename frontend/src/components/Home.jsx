import React, { useContext } from 'react'
import BlogPostCard from './BlogPostCard';
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { AuthContext } from './context/AuthContext';

function Home() {

  const [posts,setPosts]=useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const {queryset}=useContext(AuthContext)
  useEffect(()=>{


   async function getData(){
     

     try {
      const response=await axios.get('http://127.0.0.1:8000/api/all-post/')

         setPosts(response.data);
         setFilteredPosts(response.data)
      console.log(response)
      
     } catch (error) {
        console.error("error",error)
     }
   }
   getData();

  },[])
  useEffect(() => {
    
    if (queryset) {
      const filtered = posts.filter(post =>
        post.category.toLowerCase().includes(queryset.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
     
      setFilteredPosts(posts);
    }
  }, [queryset, posts]);

   
  
  
  return (
    <div className="bg-teal-100 min-h-screen p-4">
      
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

      {filteredPosts.length===0 ?
       (<p>nothing found</p>):(filteredPosts.map((post) => (
        <NavLink
           to={`/single-post/${post.id}`}
           key={post.id}
           className="block"
        >
          <BlogPostCard
            title={post.title}
             content={post.content}
             category={post.category}
           />
        </NavLink>
       )))
      }

      
      
    </div>
  </div>
  )
}

export default Home
