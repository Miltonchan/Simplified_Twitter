import React, { useState, useEffect } from 'react';
import './Post_component.css';

const Post = () => {
  const [content, setContent] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async () => {
    if (!content) {
      return false;
    }

    await fetch('http://localhost:8000/posts', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        'username': user.useraccount.username,
        'content': content,
      })
    })

    setContent('');
    return false;
  }

  return (
    <div className="post-page">
      <div className="post-topicbar">
        Post
      </div>
      <form onSubmit={handleSubmit} className="post-section">
        <div className="post-block">
          <div className="post-textarea-container">
            <textarea
              required
              placeholder="Enter twitter here..."
              className="post-textarea"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="post-toolbar">
            <div className="post-toolbar-block">
              Tool
            </div>
            <div className="post-toolbar-block">
              <button type='submit' className="post-toolbar-btn">Send</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Post;
