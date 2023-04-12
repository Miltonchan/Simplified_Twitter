import React, { useState, useEffect } from 'react';
import './Admin_component.css';

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
        <div className="admin-section">
          <h2>Delete user</h2>
          <div className="description-text">This allows you to delete a particular user.</div>
          <div className="admin-btn-container">
            <button className="admin-btn">Inspect</button>
          </div>
        </div>
        <div className="admin-section">
          <h2>Statistic</h2>
          <div className="description-text">This allows you to inspect the statistic of tweet culminatied in Beitter.</div>
          <div className="admin-btn-container">
            <button className="admin-btn">Inspect</button>
          </div>
        </div>
      </div>

      {isListDialogOpen && (
        <div className="faded-screen-background" onDoubleClick={handleListDialogCancel}>
          <div className="message-dialog">
            <div className="message-dialog-topic">
              User List
            </div>
            <div className="message-dialog-description">
              <div className="userlist-page">
                <div className="userlist-row">
                  <div className="userlist-username">
                    Kirito
                  </div>
                  <div className="userlist-btn-container">
                    <button className="userlist-btn">Action</button>
                  </div>
                </div>
                <div className="userlist-row">
                  <div className="userlist-username">
                    Beater
                  </div>
                  <div className="userlist-btn-container">
                    <button className="userlist-btn">Action</button>
                  </div>
                </div>
                <div className="userlist-row">
                  <div className="userlist-username">
                    Asuna
                  </div>
                  <div className="userlist-btn-container">
                    <button className="userlist-btn">Action</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="message-dialog-bottom-bar"/>
          </div>
        </div>
      )}

    </div>
  )
}
