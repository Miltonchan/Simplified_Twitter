import React, { useState } from 'react';
import './Setting_component.css';
import AcceptButton from '../icons/AcceptButton.png';
import DeclineButton from '../icons/DeclineButton.png';

export default function Setting_component() {
  const [isPublic, setIsPublic] = useState(false);
  const [username, setUsername] = useState('Kirito');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [followers, setFollowers] = useState(['JaneDoe', 'MarkSmith']);
  const [following, setFollowing] = useState(['JaneDoe']);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handlePublicChange = (event) => {
    setIsPublic(event.target.checked);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Do something with the delete action, such as sending a request to the backend
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="settings-page">
      <div className="settings-topicbar">
        <h1>Settings</h1>
      </div>
      <div className="settings-section">
        <h2>Privacy</h2>
        <div className="description-text">This allows you to change your account into private.</div>
        <label>
          <input type="checkbox" checked={isPublic} onChange={handlePublicChange} />
          Public account
        </label>
      </div>

      <div className="settings-section">
        <h2>Username</h2>
        <div className="description-text">This allows you to rename your username. Note that the name shown in your profile will also be changed.</div>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>

      <div className="settings-section">
        <h2>Password</h2>
        <div className="description-text">This allows you to rename your password.</div>
        <input type="password" placeholder="Current password" value={password} onChange={handlePasswordChange} />
        <input type="password" placeholder="New password" value={newPassword} onChange={handleNewPasswordChange} />
      </div>

      <div className="settings-section">
        <h2>Followers</h2>
        <ul>
          {followers.map((follower) => (
            <li key={follower}>{follower}</li>
          ))}
        </ul>
      </div>

      <div className="settings-section">
        <h2>Following</h2>
        <ul>
          {following.map((followed) => (
            <li key={followed}>{followed}</li>
          ))}
        </ul>
      </div>

      <div className="settings-section">
        <button className="delete-account-button" onClick={handleDeleteClick}>Delete account</button>
      </div>

      {isDeleteDialogOpen && (
        <div className="faded-screen-background">
          <div className="delete-dialog">
            <div className="delete-dialog-topic">
              Alert
            </div>
            <div className="delete-dialog-description">
              <p>Are you sure you want to delete your account?</p>
            </div>
            <div className="delete-dialog-actions">
              <div className="delete-dialog-button-container">
                <img src={AcceptButton} className="delete-confirm-button" onClick={handleDeleteConfirm} />
              </div>
              <div className="delete-dialog-button-container">
                <img src={DeclineButton} className="delete-cancel-button" onClick={handleDeleteCancel} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
