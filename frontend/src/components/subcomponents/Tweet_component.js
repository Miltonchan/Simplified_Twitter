import React, { useState, useEffect } from 'react';
import './Tweet_component.css';
import './Post_component.css';

const Tweet = () => {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");

  const user = JSON.parse(localStorage.getItem('user'));


  const fetchFollowingPosts = async () => {
    let followingPosts = [];
    for (let i=0; i<user.userinfo.following.length; i++) {
      let postData = await fetch(`http://localhost:8000/posts?username=${user.userinfo.following[i]}`,
      {
        method: 'GET',
        mode: 'cors'
      })
      .then(data => data.json());

    postData = await fetchComments(postData);
    followingPosts = [...followingPosts, ...postData];
    }

    setPosts(followingPosts);
    // console.log(postData);
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
      .finally(fetchFollowingPosts)

      // alert(res);
  }

  const dislikePosts = async (postId) => {
    const res = await fetch('http://localhost:8000/posts/dislike',
      {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "postId": postId,
          "username": user.useraccount.username
        })
      })
      .then(data => data.json())
      .finally(fetchFollowingPosts)

      // alert(res);
  }

  const retweetPosts = async (post) => {
    const res = await fetch('http://localhost:8000/posts/retweet',
      {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "postId": post.postId,
          "username": user.userinfo.username,
          "content": post.content,
          "retweeter": user.userinfo.username,
        })
      })
      .then(data => data.json())
      .finally(fetchFollowingPosts)

      // alert(res);
  }

  const createPost = async () => {
    if (!input) {
      return;
    }
    await fetch('http://localhost:8000/posts',
      {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "username": user.userinfo.username,
          "content": input,
        })
      })
      .then(data => data.json())
      .finally(fetchFollowingPosts);
    
    setInput("");
  }

  useEffect(() => {
    fetchFollowingPosts();
  }, []);

  return (
    <div className="tweetandpost-page">
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
                  <div onClick={() => retweetPosts(val)}  className="tweet-block-action-block">
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
      <div className="post-section">
        <div className="post-block">
          <div className="post-textarea-container">
            <textarea
              required
              placeholder="Enter twitter here..."
              className="post-textarea"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </div>
          <div className="post-toolbar">
            <div className="post-toolbar-block">
              Tool
            </div>
            <div className="post-toolbar-block">
              <button className="post-toolbar-btn" onClick={createPost}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
