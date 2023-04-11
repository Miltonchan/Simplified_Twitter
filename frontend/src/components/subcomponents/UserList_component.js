import React from 'react';
import './UserList_component.css';

const UserList = () => {
  return (
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
  )
}

export default UserList
