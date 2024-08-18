import React, { useState } from 'react';
import axios from "axios"

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !content || !category) {
      setErrors('Title and content are required.');
      return;
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/all-post/', {
        title,
        content,
        category,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('response', response);
  
      // Handle successful response
      setTitle('');
      setContent('');
      setErrors('');
      setCategory('');
      alert('Blog post created successfully!');
    } catch (error) {
      console.error('Error:', error);
      setErrors('Failed to create blog post.');
    }
  };

  return (
    <div className="w-7/12 mx-auto p-4 bg-teal-50 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Blog Post</h2>
      {errors && <p className="text-red-500 mb-4">{errors}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm hover:bg-teal-700  transition-colors"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
