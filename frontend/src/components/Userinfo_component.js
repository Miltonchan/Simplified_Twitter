import React, { useState, useEffect } from 'react';
import './Userinfo_component.css';

import AlertDialog from '../dialogs/AlertDialog';

export default function Userinfo_component() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [posts, setPosts] = useState([]);

  const fetchSelfPosts = async () => {
    let postData = await fetch(`http://localhost:8000/posts?username=${user.userinfo.username}`,
    {
      method: 'GET',
      mode: 'cors'
    })
    .then(data => data.json());

    setPosts(postData);
    // console.log(postData);
  }

  useEffect(() => {
    fetchSelfPosts();
  }, []);

  return (
    <div className="userinfo-page">
      <div className="userinfo-topic">
        <h2>Profile</h2>
      </div>
      <div className="userinfo-main">
        <div className="userinfo-section">
          <div className="userinfo-profile">
            <div className="userinfo-profile-header">
              <img src="https://picsum.photos/200" alt="User avatar" className="userinfo-avatar" />
              <div className="userinfo-userdetails">
                <h1 className="userinfo-name">{user.userinfo.username}</h1>
                <p className="userinfo-userid">@{user.useraccount.userId}</p>
              </div>
            </div>
            <div className="userinfo-stats">
              <div className="userinfo-stat">
                <p className="userinfo-count">{user.userinfo.follower.length}</p>
                <p className="userinfo-label">Followers</p>
              </div>
              <div className="userinfo-stat">
                <p className="userinfo-count">{user.userinfo.following.length}</p>
                <p className="userinfo-label">Following</p>
              </div>
              <div className="userinfo-stat">
                <p className="userinfo-count">{posts.length}</p>
                <p className="userinfo-label">Tweets</p>
              </div>
            </div>
          </div>
        </div>
        <div className="userinfo-follow">
          <div className="userinfo-section">
            <h2>Followers</h2>
            <ul>
              {user.userinfo.follower.map((val, index) => (
                <div key={index} className="userinfo-follow-row">
                  <div className="userinfo-follow-name">
                    <li>{val}</li>
                  </div>
                  <div className="userinfo-follow-action">
                    <div className="userinfo-follow-row-block">
                      <button className="userinfo-unfollow-btn">Unfollow</button>
                    </div>
                    <div className="userinfo-follow-row-block">
                      <button className="userinfo-message-btn">Message</button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
          <div className="userinfo-section">
            <h2>Following</h2>
            <ul>
              {user.userinfo.follower.map((val, index) => (
                <div key={index} className="userinfo-follow-row">
                  <div className="userinfo-follow-name">
                    <li>{val}</li>
                  </div>
                  <div className="userinfo-follow-action">
                    <div className="userinfo-follow-row-block">
                      <button className="userinfo-unfollow-btn">Unfollow</button>
                    </div>
                    <div className="userinfo-follow-row-block">
                      <button className="userinfo-message-btn">Message</button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
