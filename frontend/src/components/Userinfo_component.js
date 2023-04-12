import React, { useState, useEffect } from 'react';
import './Userinfo_component.css';

import AlertDialog from '../dialogs/AlertDialog';

export default function Userinfo_component() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [posts, setPosts] = useState([]);

  const [isFollowDialogOpen, setIsFollowDialogOpen] = useState(false);

  const handleFollowDialogClick = () => {
    setIsFollowDialogOpen(true);
  };

  const handleFollowDialogConfirm = () => {
    setIsFollowDialogOpen(false);
  };

  const handleFollowDialogCancel = () => {
    setIsFollowDialogOpen(false);
  };

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
                <h1 className="uesrinfo-name">{user.userinfo.username}</h1>
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
            <div className="userinfo-actions">
              <button
                className="userinfo-follow-btn"
                onClick={handleFollowDialogClick}
              >
                Follow
              </button>
              <button
                className="userinfo-message-btn"
                onClick={handleFollowDialogClick}
              >
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {isFollowDialogOpen && (
        <AlertDialog
         title="Follow"
         description="Are you sure you want to follow this user?"
         onYes={handleFollowDialogConfirm}
         onNo={handleFollowDialogCancel}
        />
      )}

    </div>
  )
}
