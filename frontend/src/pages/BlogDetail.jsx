import React, { Component } from "react";
import Cookies from "js-cookie";
import { endpoint } from "../endpoints";
import Navigation from "../components/Navbar";
import RelatedLinks from "../components/RelatedLinks";
import store from "../redux/store/store";
import { userActionTypes } from "../redux/constants/usersAction.types";

export default class BlogDetail extends Component {
  constructor() {
    super();
    this.state = {
      blog: {},
    };
  }
// REUSABLE FETCH HELPER
fetchBlog = (id) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + Cookies.get("jwt"));

  return fetch(endpoint + id, {
    method: "GET",
    headers: myHeaders,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};
  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.fetchBlog(id).then((data) => {
      if (data) {
        this.setState({ blog: data });
        // Keeping your Redux login dispatch
        store.dispatch({
          type: userActionTypes.LOGIN_SUCCESS,
          payload: { isLoggedIn: true },
        });
      }
    });
  };
  

  componentDidUpdate = (prevProps) => {
    const currentId = this.props.match.params.id;
    // Check if the URL ID changed
    if (prevProps.match.params.id !== currentId) {
      this.fetchBlog(currentId).then((data) => {
        if (data) this.setState({ blog: data });
      });
    }
  };

  renderNewBlog = (event) => {
    // currentTarget ensures we get the ID from the div with the onClick
    const newId = event.currentTarget.id; 
    
    this.props.history.push("/blog/" + newId);
    this.setState({ blog: {} });

    this.fetchBlog(newId).then((data) => {
      if (data) this.setState({ blog: data });
    });
  };

  render() {
    const { blog } = this.state;
    return Object.keys(blog).length === 0 ? (
      <>
        <Navigation />
        <p>Loading..</p>
      </>
    ) : (
      <div>
        <Navigation />
        <div className="container" id="blog">
          <div className="blog-detail">
            <div className="blog-container">
              <div className="blog-info">
                <h2 className="blog-title">{blog.title}</h2>
              </div>
              <div className="blog-img">
                <img src={blog.imageUrl} alt="blog" />
              </div>
              <div className="blog-content">
                <p className="content">{blog.content}</p>
              </div>
            </div>
          </div>
          <RelatedLinks
            blog={blog}
            renderNewBlog={this.renderNewBlog}
          />
        </div>
      </div>
    );
  }
}
