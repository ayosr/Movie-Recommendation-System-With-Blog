import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/BlogCard.css"

const CreateBlog = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      blogID: Date.now().toString(),
      title, author, content,
      date: new Date().toLocaleDateString(),
      imageUrl: "https://unsplash.com"
    };
    addBlog(newPost);
    navigate("/blog");
  };

  return (
    <div className="create-blog-form">
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
        <button type="submit" className="btn-primary">Publish</button>
      </form>
    </div>
  );
};

export default CreateBlog;
