import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Post = ({ blogs, deleteBlog }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.blogID === id);

  if (!blog) return <div className="post-detail"><h2>Post not found</h2></div>;

  const handleDelete = () => {
    if (window.confirm("Delete this post?")) {
      deleteBlog(blog.blogID);
      navigate("/blog");
    }
  };

  return (
    <article className="post-detail">
      <div className="post-nav">
        <button onClick={() => navigate("/blog")}>← Back</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
      <h1>{blog.title}</h1>
      <p className="meta">By {blog.author} on {blog.date}</p>
      <img src={blog.imageUrl} alt={blog.title} className="post-banner" />
      <div className="post-body">{blog.content}</div>
    </article>
  );
};

export default Post;
