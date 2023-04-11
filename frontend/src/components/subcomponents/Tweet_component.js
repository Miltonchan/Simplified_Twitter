import React, { useState, useEffect } from 'react';
import './Tweet_component.css';

const Tweet = () => {
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

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

  const likePosts = async (postId) => {
    const res = await fetch('http://localhost:8000/posts/like',
      {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "postId": postId,
          "username": user.userinfo.username
        })
      })
      .then(data => data.json())
      alert(res);
  }

  useEffect(() => {
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
                  <div onClick={() => likePosts(val.postId)} className="tweet-block-action-block">
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
