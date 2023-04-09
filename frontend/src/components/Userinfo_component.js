import React from 'react';
import './Userinfo_component.css';

export default function Userinfo_component() {
  return (
    <div class="center-container">
      <div className="userinfo-page">
        <div className="userinfo-header">
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
        <div className="uesrinfo-actions">
          <button className="userinfo-follow-btn">Follow</button>
          <button className="userinfo-message-btn">Message</button>
        </div>
      </div>
    </div>
  )
}
