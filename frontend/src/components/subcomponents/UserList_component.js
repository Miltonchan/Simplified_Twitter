import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './UserList_component.css';
import '../../dialogs/MessageDialog.css';

const UserList = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleCancel() {
    setIsOpen(false);
    if (typeof props.onCancel === 'function') {
      props.onCancel();
    }
  }

  return (
    <div className="faded-screen-background" onDoubleClick={handleCancel}>
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
  )
}

UserList.propTypes = {
  onCancel: PropTypes.func,
};

export default UserList
