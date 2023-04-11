import React from 'react';
import './ChatroomList_component.css';
import { useNavigate } from 'react-router-dom';

const ChatroomList_component = () => {
  const navigate = useNavigate();

  const chats = [
    {
      id: 1,
      avatar: '',
      name: 'Kirito',
      lastMessage: 'Hey there!',
      timestamp: '1h ago'
    }
  ];

  const handleClick = (chatId) => {
    console.log(`Clicked chat with id ${chatId}`);
    navigate(`/chatroom/chat?rmId=${chatId}`);
    // navigate to chatroom with corresponding chatId
  };

  return (
    <div className="chatroomlist-page">
      <div className="chatroomlist-topic">
        <h2>Message</h2>
      </div>
      <div className="chatroomlist-list">
        {chats.map((chat, index) => (
          <div className="chatroomlist-chat" key={index} onClick={() => handleClick(chat.id)}>
            <img src={chat.avatar} alt={chat.name} className="chatroomlist-avatar" />
            <div className="chatroomlist-chat-details">
              <div className="chatroomlist-chat-header">
                <span className="chatroomlist-name">{chat.name}</span>
                <span className="chatroomlist-timestamp">{chat.timestamp}</span>
              </div>
              <div className="chatroomlist-last-message">{chat.lastMessage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatroomList_component;
