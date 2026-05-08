import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Blogcard.css"

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const CreateBlog = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadError, setUploadError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    setUploadError("");
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file.");
      return;
    }
    // ~2 MB cap so localStorage doesn't blow up
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Image is too large (max 2 MB).");
      return;
    }
    try {
      const dataUrl = await fileToDataUrl(file);
      setImageUrl(dataUrl);
    } catch {
      setUploadError("Could not read that file.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      blogID: Date.now().toString(),
      title,
      author,
      content,
      date: new Date().toLocaleDateString(),
      imageUrl: imageUrl || "",
    };
    addBlog(newPost);
    navigate("/blog");
  };

  return (
    <div className="create-blog-form">
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="image-field">
          <label className="image-field-label">Cover image (optional)</label>
          <input
            type="url"
            placeholder="Paste image URL…"
            value={imageUrl.startsWith("data:") ? "" : imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <div className="image-field-or">— or —</div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {uploadError && <p className="image-field-error">{uploadError}</p>}
          {imageUrl && (
            <div className="image-preview-wrap">
              <img
                src={imageUrl}
                alt="Cover preview"
                className="image-preview"
                onError={() => setUploadError("Image URL could not be loaded.")}
              />
              <button
                type="button"
                className="image-remove-btn"
                onClick={() => {
                  setImageUrl("");
                  setUploadError("");
                }}
              >
                Remove image
              </button>
            </div>
          )}
        </div>

        <button type="submit" className="btn-primary">Publish</button>
      </form>
    </div>
  );
};

export default CreateBlog;;
