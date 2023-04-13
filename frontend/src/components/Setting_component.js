import React, { useState } from 'react';
import './Setting_component.css';
import AcceptButton from '../icons/AcceptButton.png';
import DeclineButton from '../icons/DeclineButton.png';
import { useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';

import AlertDialog from "../dialogs/AlertDialog";

export default function Setting_component() {
  const user = JSON.parse(localStorage.getItem('user'));

  const [isPublic, setIsPublic] = useState(!user.userinfo.private);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [followers, setFollowers] = useState(['JaneDoe', 'MarkSmith']);
  const [following, setFollowing] = useState(['JaneDoe']);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const navigate = useNavigate();

  const handlePublicChange = (event) => {
    setIsPublic(event.target.checked);
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

  const changePassword = async () => {
    const res = await fetch('http://localhost:8000/useraccounts/changePassword', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        'username': user.useraccount.username,
        'oldPassword': password,
        'newPassword': newPassword,
      })
    })
    .then(res => res.json());

    if (res === 'Status: success') {
      localStorage.removeItem('user');
      navigate('/login');
      window.location.pathname = '/login';
    }else {
      alert(res);
    }
  }

  const changeInfo = async () => {
    const res = await fetch('http://localhost:8000/userinfos/update', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        'userId': user.useraccount.userId,
        'private': isPublic,
      })
    })
    .then(res => res.json());
  }

  const confirmChange = async () => {
    await changeInfo();
    if (password && newPassword) {
      await changePassword();
    }
  }

  return (
    <div className="setting-page">
      <div className="setting-topicbar">
        <h1>Settings</h1>
      </div>

      <div className="setting-section">
        <h2>Privacy</h2>
        <div className="description-text">This allows you to change your account into public.</div>
        <label>
          <Switch checked={isPublic} color="warning" onChange={handlePublicChange} />
          {isPublic ? 'Public account' : 'Private account'}
        </label>
      </div>

      <div className="setting-section">
        <h2>Username</h2>
        <h4>{user.useraccount.username}</h4>
      </div>

      <div className="setting-section">
        <h2>Password</h2>
        <div className="description-text">This allows you to rename your password.</div>
        <input type="password" placeholder="Current password" value={password} onChange={handlePasswordChange} />
        <input type="password" placeholder="New password" value={newPassword} onChange={handleNewPasswordChange} />
        <button className="setting-delete-account-button" onClick={confirmChange}>Change Password</button>  {/* not sure if it is correct onClick function for the button */}
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
