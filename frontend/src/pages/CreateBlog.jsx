import React, { Component } from "react";
import Cookies from "js-cookie";
import { endpoint } from "../endpoints";
import Navigation from "../components/Navbar";

export default class CreateBlog extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      imageUrl: "",
      content: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + Cookies.get("jwt"));
    myHeaders.append("Content-Type", "application/json");

    fetch(endpoint, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        if (response.ok) {
          alert("Blog created successfully!");
          this.props.history.push("/"); // Redirect to home
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  render() {
    return (
      <div>
        <Navigation />
        <div className="container create-blog-form">
          <h1 className="blog-title">Create New Post</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Post Title"
              value={this.state.title}
              onChange={this.handleChange}
              required
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL (e.g. https://...)"
              value={this.state.imageUrl}
              onChange={this.handleChange}
              required
            />
            <textarea
              name="content"
              rows="10"
              placeholder="Write your story here..."
              value={this.state.content}
              onChange={this.handleChange}
              required
            ></textarea>
            <button type="submit" className="create-btn">
              Publish Story
            </button>
          </form>
        </div>
      </div>
    );
  }
}
