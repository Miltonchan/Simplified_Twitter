import React, { useState, useEffect } from 'react';
import './Userinfo_component.css';

import CommentDialog from '../dialogs/CommentDialog';

export default function Userinfo_component() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

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
                <h1 className="uesrinfo-name">Kirito</h1>
                <p className="userinfo-userid">@Kirito</p>
                <p className="userinfo-bio">Beater.</p>
              </div>
            </div>
            <div className="userinfo-stats">
              <div className="userinfo-stat">
                <p className="userinfo-count">100</p>
                <p className="userinfo-label">Followers</p>
              </div>
              <div className="userinfo-stat">
                <p className="userinfo-count">200</p>
                <p className="userinfo-label">Following</p>
              </div>
              <div className="userinfo-stat">
                <p className="userinfo-count">300</p>
                <p className="userinfo-label">Tweets</p>
              </div>
            </div>
            <div className="userinfo-actions">
              <button
                className="userinfo-follow-btn"
                onClick={() => {}}
              >
                Follow
              </button>
              <button
                className="userinfo-message-btn"
                onClick={handleDeleteClick}
              >
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {isDeleteDialogOpen && (
        <CommentDialog
         title="Alert"
         description="Are you sure you want to delete your account?"
         useravatar="Test"
         username="Hi"
        />
      )}

    </div>
  )
}
