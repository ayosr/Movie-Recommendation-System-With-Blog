import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div className="blog-card" onClick={() => navigate(`/blog/${blog.blogID}`)}>
      {blog.imageUrl && (
        <img className="blog-card-img" src={blog.imageUrl} alt={blog.title} />
      )}
      <div className="blog-card-body">
        <h3 className="blog-card-title">{blog.title}</h3>
        <p className="blog-card-meta">By {blog.author} · {blog.date}</p>
        <p className="blog-card-excerpt">
          {blog.content ? `${blog.content.substr(0, 100)}...` : ""}
        </p>
        <button
          className="btn-primary"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/blog/${blog.blogID}`);
          }}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
