import React, { useState, useEffect } from 'react';
import './Post_component.css';

const Post = () => {
  return (
    <div className="post-page">
      <div className="post-topicbar">
        Post
      </div>
      <div className="post-section">
        <div className="post-block">
          <div className="post-textarea-container">
            <textarea
              required
              placeholder="Enter twitter here..."
              className="post-textarea"
            />
          </div>
          <div className="post-toolbar">
            <div className="post-toolbar-block">
              Tool
            </div>
            <div className="post-toolbar-block">
              <button className="post-toolbar-btn">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
