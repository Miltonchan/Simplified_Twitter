import React, { useState } from 'react';
import './Setting_component.css';

export default function Setting_component() {
  const [isPublic, setIsPublic] = useState(false);
  const [username, setUsername] = useState('JohnDoe');
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
    <div className="settings">
      <h1>Settings</h1>

      <div className="settings-section">
        <h2>Privacy</h2>
        <label>
          <input type="checkbox" checked={isPublic} onChange={handlePublicChange} />
          Public account
        </label>
      </div>

      <div className="settings-section">
        <h2>Username</h2>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>

      <div className="settings-section">
        <h2>Password</h2>
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
        <div className="delete-dialog">
          <p>Are you sure you want to delete your account?</p>
          <div className="delete-dialog-actions">
            <button className="delete-confirm-button" onClick={handleDeleteConfirm}>Delete</button>
            <button className="delete-cancel-button" onClick={handleDeleteCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
