import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailBlogPost = () => {
  const { id } = useParams(); 
  const [blogPost, setBlogPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {

    
    const fetchBlogPost = async () => {

      const response=await axios.get(`http://127.0.0.1:8000/api/detailPost/${id}`)
       
      console.log('response',response.data)

       setBlogPost(response.data)
       setComments(response.data.comments)
      
      // const response = await fetch(`/api/blog-posts/${id}`);
      // const data = await response.json();
      // setBlogPost(data);
    };

    const fetchComments = async () => {
      const response = await fetch(`/api/blog-posts/${id}/comments`);
      const data = await response.json();
      setComments(data);
    };

    fetchBlogPost();
    fetchComments();
  }, [id]);
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if(newComment==''){
      alert('first write something')
    }else{
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/comment/', {
          content: newComment,
          post: id,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const addedComment = response.data.data;
        setComments([...comments, addedComment]);
        setNewComment('');
      } catch (error) {
        console.error('Error posting comment:', error);
      }

    }

   

    
   

    
  };
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  if (!blogPost) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-teal-100 rounded-lg shadow-md overflow-hidden p-6 mt-10">
      <h1 className="text-3xl font-bold mb-4">{blogPost.title}</h1>
      <p className="text-teal-500 mb-4">{blogPost.category}</p>
      <div className="text-gray-700">
        {blogPost.content}
      </div>

      <div>
        <button
          onClick={toggleComments}
          className="bg-teal-500 text-white px-4 py-2 rounded mb-4"
        >
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </button>

        {showComments && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
                className="w-full p-2 border border-gray-300 rounded mb-2"
                rows="4"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Post Comment
              </button>
            </form>
            <ul>
              {comments.map((comment) => (
                 <li key={comment.id} className="border-b border-gray-300 py-2">
                 {comment.content} - <span className="text-gray-600">by {comment.user}</span>
               </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailBlogPost;
