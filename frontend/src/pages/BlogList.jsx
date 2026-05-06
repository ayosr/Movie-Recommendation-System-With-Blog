import React from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import "../css/BlogCard.css"

const BlogList = ({ blogs }) => (
  <div className="blog-list-container">
    <header className="blog-header">
      <h1>Movie Insights</h1>
      <Link to="/blog/new" className="btn-primary">+ Write a Review</Link>
    </header>
    <div className="blog-grid">
      {blogs.map(blog => (
        <BlogCard key={blog.blogID} blog={blog} />
      ))}
    </div>
  </div>
);

export default BlogList;
