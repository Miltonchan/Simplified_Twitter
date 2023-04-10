import React, { useState } from 'react';
import './Notification_component.css';

export default function Notification_component() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "You have a new message from John Doe",
      read: false,
    },
    {
      id: 2,
      text: "Your order has been shipped",
      read: false,
    },
    {
      id: 3,
      text: "You have a new follower",
      read: true,
    },
    {
      id: 4,
      text: "Your subscription has expired",
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id === id) {
        notification.read = true;
      }
      return notification;
    });
    setNotifications(updatedNotifications);
  };

  return (
    <div className="notification-page">
      <div className="notification-topic">
        <h2>Notifications</h2>
      </div>
      <div className="notification-list">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={
              notification.read
                ? "notification-item read"
                : "notification-item"
            }
            onClick={() => markAsRead(notification.id)}
          >
            <p className="notification-text">{notification.text}</p>
            {!notification.read && (
              <span className="notification-badge"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
