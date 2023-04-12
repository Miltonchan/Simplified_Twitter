import React, { useEffect, useState } from 'react';
import './ChatroomList_component.css';
import { useNavigate } from 'react-router-dom';

const ChatroomList_component = () => {
  const navigate = useNavigate();
  const [chatrooms, setChatrooms] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchChatrooms = async () => {
      let chatroomsData = await fetch(`http://localhost:8000/chatrooms?userId=${user.useraccount.userId}`, 
        {
          method: 'GET',
          mode: 'cors'
        })
        .then(data => data.json());
      
      chatroomsData = await processChatroom(chatroomsData);
      setChatrooms(chatroomsData);
    }
    fetchChatrooms();
  }, [user.useraccount.userId]);

  // add the info of the other party of the chatroom 
  const processChatroom = async (chatrooms) => {
    for (let i=0; i<chatrooms.length; i++) {
      let otherUser = null;
      if (chatrooms[i].firstUserId === user.useraccount.userId) { // chat init by user
        otherUser = await fetch(`http://localhost:8000/userinfos?userId=${chatrooms[i].secUserId}`)
          .then(data => data.json());
      }else { // chat init by other user
        otherUser = await fetch(`http://localhost:8000/userinfos?userId=${chatrooms[i].firstUserId}`)
          .then(data => data.json());
      }
      chatrooms[i].otherUser = await otherUser;

      chatrooms[i].lastestMessage = await fetch(`http://localhost:8000/messages/latest?rmId=${chatrooms[i].rmId}`)
        .then(data => data.json());
    }
    // console.log(chatrooms);
    return chatrooms;
  }

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
    // console.log(`Clicked chat with id ${chatId}`);
    navigate(`/chatroom/chat?rmId=${chatId}`);
    // navigate to chatroom with corresponding chatId
  };

  return (
    <div className="chatroomlist-page">
      <div className="chatroomlist-topic">
        <h2>Message</h2>
      </div>
      <div className="chatroomlist-list">
        {chatrooms.map((chatroom, index) => (
          <div className="chatroomlist-chat" key={index} onClick={() => handleClick(chatroom.rmId)}>
            <img src={chatroom.avatar} alt={chatroom.name} className="chatroomlist-avatar" />
            <div className="chatroomlist-chat-details">
              <div className="chatroomlist-chat-header">
                <span className="chatroomlist-name">{chatroom.otherUser.username}</span>
                <span className="chatroomlist-timestamp">{new Date(chatroom.lastestMessage.createdAt).toDateString()}</span>
              </div>
              <div className="chatroomlist-last-message">{chatroom.lastestMessage.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatroomList_component;
