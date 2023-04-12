import React, { useState } from 'react';
import './Setting_component.css';
import AcceptButton from '../icons/AcceptButton.png';
import DeclineButton from '../icons/DeclineButton.png';

import AlertDialog from "../dialogs/AlertDialog";

export default function Setting_component() {
  const [isPublic, setIsPublic] = useState(false);
  const [username, setUsername] = useState('Kirito');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [followers, setFollowers] = useState(['JaneDoe', 'MarkSmith']);
  const [following, setFollowing] = useState(['JaneDoe']);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

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

  const handleDeleteConfirm = async () => {
    const res = await fetch('http://localhost:8000/useraccounts/delete', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        'userId': user.useraccount.userId,
      })
    })
    .then(res => res.json())
    .catch(err => err.json());

    if (res === 'Status: success') {
      await fetch('http://localhost:8000/userinfos/delete', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          'userId': user.useraccount.userId,
        })
      })
      .then(res => res.json())
      .catch(err => err.json());
    }

    alert(res);
    
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="setting-page">
      <div className="setting-topicbar">
        <h1>Settings</h1>
      </div>
      <div className="setting-section">
        <h2>Privacy</h2>
        <div className="description-text">This allows you to change your account into private.</div>
        <label>
          <input type="checkbox" checked={isPublic} onChange={handlePublicChange} />
          Public account
        </label>
      </div>

      <div className="setting-section">
        <h2>Username</h2>
        <div className="description-text">This allows you to rename your username. Note that the name shown in your profile will also be changed.</div>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>

      <div className="setting-section">
        <h2>Password</h2>
        <div className="description-text">This allows you to rename your password.</div>
        <input type="password" placeholder="Current password" value={password} onChange={handlePasswordChange} />
        <input type="password" placeholder="New password" value={newPassword} onChange={handleNewPasswordChange} />
      </div>

      <div className="setting-section">
        <h2>Followers</h2>
        <ul>
          {followers.map((follower) => (
            <li key={follower}>{follower}</li>
          ))}
        </ul>
      </div>

      <div className="setting-section">
        <h2>Following</h2>
        <ul>
          {following.map((followed) => (
            <li key={followed}>{followed}</li>
          ))}
        </ul>
      </div>

      <div className="setting-section">
        <button className="setting-delete-account-button" onClick={handleDeleteClick}>Delete account</button>
      </div>

      {isDeleteDialogOpen && (
        <AlertDialog
         title="Alert"
         description="Are you sure you want to delete your account?"
         onYes={handleDeleteConfirm}
         onNo={handleDeleteCancel}
        />
      )}
    </div>
  );
}
