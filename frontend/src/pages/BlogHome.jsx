import React, { Component } from "react";
import Cookies from "js-cookie";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";

// components
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";

// redux
import store from "../redux/store/store";
import { userActionTypes } from "../redux/constants/usersAction.types";
import usersActionCreator from "../redux/actions/usersAction.creator";

class Home extends Component {
  componentDidMount = () => {
    if (!Cookies.get("isLoggedIn") && !Cookies.get("jwt")) {
      this.props.history.push("/login");
    }
    store.dispatch(usersActionCreator(userActionTypes.AUTHORIZED));
  };

  componentDidUpdate = () => {
    // Redirect if user logs out
    if (Cookies.get("isLoggedIn") === "false" && !this.props.isLoggedIn) {
      this.props.history.push("/login");
    }
  };

  render() {
    const { blogs, isLoggedIn } = this.props;

    return (
      <div className="blog-list-container">
        <Navbar />
        
        /* Cinematic Header */
        <div className="blog-grid">
          <h1>Explore Stories</h1>
          <button 
            className="create-btn" 
            onClick={() => this.props.history.push("/create-blog")}
          >
            + Create Blog
          </button>
        </div>

        <div className="container">
          {blogs.length === 0 ? (
            <div className="loading-text">No blogs found. Start writing!</div>
          ) : (
            <div className="blog-grid">
              {this.props.blogs.map((blog) => (
                <BlogCard key={blog.blogID} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
    blogs: state.blogReducer.blogs,
  };
};

export default connect(mapStateToProps)(Home);
