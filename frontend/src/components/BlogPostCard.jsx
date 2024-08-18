import React from 'react';

const BlogPostCard = ({ title, content, category }) => {
  const maxLength = 20;
  const truncatedContent = content.length > maxLength ? content.slice(0, maxLength) + '...' : content;

  return (
    <div className="max-w-sm mx-auto bg-teal-200 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <span className="text-teal-700 font-semibold">{category}</span>
        <p className="text-gray-700 my-4">
          {truncatedContent}
        </p>
      </div>
    </div>
  );
};

export default BlogPostCard;
