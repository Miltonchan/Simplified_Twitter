import React, { useState, useEffect } from 'react';
import './OtherUserinfo_component.css';

import AlertDialog from '../dialogs/AlertDialog';

export default function OtherUserinfo_component() {
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
    <div className="otheruserinfo-page">
      <div className="otheruserinfo-topic">
        <h2>Profile</h2>
      </div>
      <div className="otheruserinfo-main">
        <div className="otheruserinfo-section">
          <div className="otheruserinfo-profile">
            <div className="otheruserinfo-profile-header">
              <img src="https://picsum.photos/200" alt="User avatar" className="otheruserinfo-avatar" />
              <div className="otheruserinfo-userdetails">
                <h1 className="otheruserinfo-name">{user.userinfo.username}</h1>
                <p className="otheruserinfo-userid">@{user.useraccount.userId}</p>
              </div>
            </div>
            <div className="otheruserinfo-stats">
              <div className="otheruserinfo-stat">
                <p className="otheruserinfo-count">{user.userinfo.follower.length}</p>
                <p className="otheruserinfo-label">Followers</p>
              </div>
              <div className="otheruserinfo-stat">
                <p className="otheruserinfo-count">{user.userinfo.following.length}</p>
                <p className="otheruserinfo-label">Following</p>
              </div>
              <div className="otheruserinfo-stat">
                <p className="otheruserinfo-count">{posts.length}</p>
                <p className="otheruserinfo-label">Tweets</p>
              </div>
            </div>
            <div className="otheruserinfo-actions">
              <button
                className="otheruserinfo-follow-btn"
                onClick={handleFollowDialogClick}
              >
                Follow
              </button>
              <button
                className="otheruserinfo-message-btn"
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
