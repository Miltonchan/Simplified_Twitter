import React, { useState, useEffect } from 'react';
import './Tweet_component.css';

const Tweet = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postData = await fetch('http://localhost:8000/posts',
        {
          method: 'GET',
          mode: 'cors'
        })
        .then(data => data.json());

      setPosts(postData);
      console.log(postData);
    }
    fetchPosts();
  }, []);

  return (
    <div className="tweet-page">
      <div className="tweet-topicbar">
        <h7>Tweet</h7>
        <div className="description-text">
          Take a look in today's SAO tweet.
        </div>
      </div>
      <div className="tweet-section">
        {posts.map((val, key) => {
          return (
            <div className="tweet-block-container">
              <div className="tweet-block">
                <div className="tweet-block-user-bar">
                  <div className="tweet-block-user-name-block">
                    <h7>{val.username}</h7>
                  </div>
                  <div className="tweet-block-user-bar-block">
                    <h2>{val.username}</h2>
                  </div>
                </div>
                <div className="tweet-block-content-section">
                  <div className="tweet-block-content" key={key}>
                    {val.content}
                  </div>
                </div>
                <div className="tweet-block-action-bar">
                  <div className="tweet-block-action-block">
                    like
                  </div>
                  <div className="tweet-block-action-block">
                    dislike
                  </div>
                  <div className="tweet-block-action-block">
                    retweet
                  </div>
                  <div className="tweet-block-action-block">
                    comment
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Tweet;
