import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBlog = ({ blogs, updateBlog }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.blogID === id);
  const [title, setTitle] = useState(blog?.title || "");
  const [content, setContent] = useState(blog?.content || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBlog({ ...blog, title, content });
    navigate(`/blog/${id}`); 
  };

  if (!blog) return <h2>Post not found</h2>;
  return (
    <div className="create-blog-form">
      <h2>Edit Review</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        <button type="submit" className="blog-action-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditBlog;
