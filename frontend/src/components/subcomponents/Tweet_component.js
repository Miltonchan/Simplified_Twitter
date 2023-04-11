import React, { useState, useEffect } from 'react';
import './Tweet_component.css';

const Tweet = () => {
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchPosts = async () => {
    let postData = await fetch('http://localhost:8000/posts',
      {
        method: 'GET',
        mode: 'cors'
      })
      .then(data => data.json());
     
    postData = await fetchComments(postData);
    setPosts(postData);
    console.log(postData);
  }

  const fetchComments = async (postData) => {
    for (let i=0; i<postData.length; i++) {
      postData[i].comment = await fetch('http://localhost:8000/comments')
        .then(data => data.json());
    }
    return postData;
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
      .finally(fetchPosts)

      alert(res);
  }

  const dislikePosts = async (postId) => {
    const res = await fetch('http://localhost:8000/posts/dislike',
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
      .finally(fetchPosts)

      alert(res);
  }

  // const retweetPosts = async (postId) => {
  //   const res = await fetch('http://localhost:8000/posts/retweet',
  //     {
  //       method: 'POST',
  //       mode: 'cors',
  //       headers: {'Content-Type':'application/json'},
  //       body: JSON.stringify({
  //         "postId": postId,
  //         "username": user.userinfo.username
  //       })
  //     })
  //     .then(data => data.json())
  //     .finally(fetchPosts)

  //     alert(res);
  // }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="tweet-page">
      <div className="tweet-topicbar">
        <h6>Tweet</h6>
        <div className="description-text">
          Take a look in today's SAO tweet.
        </div>
      </div>
      <div className="tweet-section">
        {posts.map((val, index) => {
          return (
            <div key={index} className="tweet-block-container">
              <div className="tweet-block">
                <div className="tweet-block-user-bar">
                  <div className="tweet-block-user-name-block">
                    <h6>{val.username}</h6>
                  </div>
                  <div className="tweet-block-user-bar-block">
                    <h2>{val.username}</h2>
                  </div>
                </div>
                <div className="tweet-block-content-section">
                  <div className="tweet-block-content">
                    {val.content}
                  </div>
                </div>
                <div className="tweet-block-action-bar">
                  <div onClick={() => likePosts(val.postId)} className="tweet-block-action-block">
                    like {val.like.length}
                  </div>
                  <div onClick={() => dislikePosts(val.postId)} className="tweet-block-action-block">
                    dislike {val.dislike.length}
                  </div>
                  <div className="tweet-block-action-block">
                    retweet {val.retweetBy.length}
                  </div>
                  <div className="tweet-block-action-block">
                    comment {val.comment.length}
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
