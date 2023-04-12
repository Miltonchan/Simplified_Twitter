import React, { useState, useEffect } from 'react';
import './Admin_component.css';
import './subcomponents/UserList_component.css';

import AlertDialog from "../dialogs/AlertDialog";
import MessageDialog from "../dialogs/MessageDialog";

import UserList from "./subcomponents/UserList_component";

export default function Admin_component() {
  const [isListDialogOpen, setIsListDialogOpen] = useState(false);

  const handleListDialogClick = () => {
    setIsListDialogOpen(true);
  };

  const handleListDialogCancel = () => {
    setIsListDialogOpen(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-topicbar">
        <h2>Administrator</h2>
      </div>
      <div className="admin-main">
        <div className="admin-section">
          <h2>List all users</h2>
          <div className="description-text">This allows you to inspect the list of all existing users.</div>
          <div className="admin-btn-container">
            <button className="admin-btn" onClick={handleListDialogClick}>Inspect</button>
          </div>
        </div>
      </div>

      {isListDialogOpen && (
        <div onDoubleClick={handleListDialogCancel}>
          <UserList  />
        </div>
      )}

    </div>
  )
}
