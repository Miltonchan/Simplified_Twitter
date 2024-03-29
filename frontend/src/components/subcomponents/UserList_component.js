import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './UserList_component.css';
import '../../dialogs/MessageDialog.css';

const UserList = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetch('http://localhost:8000/userinfos', {
        method: 'GET',
        mode: 'cors'
      })
      .then(res => res.json());

      console.log(userData)
      setUsers(userData);
    };

    fetchUserData();
  }, []);

  const deleteUser = async (user) => {
    // await fetch('http://localhost:8000/userinfos/delete', {
    //   method: 'POST',
    //   mode: 'cors',
    //   body: JSON.stringify({
    //     'userId': userId
    //   })
    // })

    let index = users.indexOf(user);
    const newUsers = [];
    for (let i=0; i<users.length; i++) {
      if (i !== index) {
        newUsers.push(users[i]);
      }
    }
    setUsers(newUsers);
  }

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
            {users.map((user, index) => {
              return (
              <div className="userlist-row">
                <div className="userlist-username">
                  {user.username}
                </div>
                <div className="userlist-btn-container">
                  <button className="userlist-btn" onClick={() => deleteUser(user)}>Delete</button>
                </div>
              </div>
              )
            })}
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
