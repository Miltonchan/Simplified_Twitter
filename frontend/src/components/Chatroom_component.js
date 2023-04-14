import React, { useState, useEffect } from 'react';
import './Chatroom_component.css';
import { useLocation } from 'react-router-dom';

export default function Chatroom_component() {
  const [messages, setMessages] = useState([]);
  const [chatroom, setChatroom] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [otherUser, setOtherUser] = useState();
  const user = JSON.parse(localStorage.getItem('user'));

  const search = useLocation().search;
  const rmId = new URLSearchParams(search).get('rmId');

  useEffect(() => {
    const fetchMessages = async () => {
      let messageData = await fetch(`http://localhost:8000/messages?rmId=${rmId}`,
        {
          method: 'GET',
          mode: 'cors'
        })
        .then(data => data.json());
      messageData = await processMessages(messageData);
      setMessages(messageData);
      fetchOtherUser();
      // console.log(messageData);
    }
    
    fetchMessages();
    // console.log(rmId);
  }, []);

  useEffect(() => {
    const fetchChatroom = async () => {
      const chatroomData = await fetch('http://localhost:8000/chatrooms',
        {
          method: 'GET',
          mode: 'cors'
        })
        .then(data => data.json());
      setChatroom(chatroomData)
      // console.log(chatroomData);
    }
    fetchChatroom();
  }, []);

  const saveMessage = async (inputValue) => {
    try {
      const response = await fetch('http://localhost:8000/messages', {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "rmId": rmId,
          "userId": user.useraccount.userId,
          "message": inputValue,
        })
      })
      .then(data => data.json());
      // console.log(response); // log the response data for testing purposes
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOtherUser = async () => {
    let chatroomsData = await fetch(`http://localhost:8000/chatrooms?rmId=${rmId}`, 
        {
          method: 'GET',
          mode: 'cors'
        })
        .then(data => data.json());

    const otherUserId = chatroomsData.firstUserId === user.useraccount.userId ? chatroomsData.secUserId : chatroomsData.firstUserId;
    const data = await fetch(`http://localhost:8000/userinfos?userId=${otherUserId}`,
        {
          method: 'GET',
          mode: 'cors'
        })
        .then(data => data.json());

        setOtherUser(data);
  }

  const processMessages = async (messageData) => {
    // console.log(messageData)
    for (let i=0; i < messageData.length; i++) {
      messageData[i].self = messageData[i].userId === user.useraccount.userId ? true : false;
      // console.log(messageData[i].userId === user.useraccount.userId);
      // console.log(user.useraccount.userId)
    }
    return messageData;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      saveMessage(inputValue);
      setMessages([...messages, { message: inputValue, self: true }]);
      setInputValue("");
    }
  }

  return (
    <div className="chatroom-container">
      <div className="chatroom-header">
        <img
          src={otherUser && otherUser.icon}
          alt=''
          className="chatroom-receiver-avatar"
        />
        <h2>{otherUser && otherUser.username}</h2>
      </div>
      <div className="chatroom-messages">
        {messages && messages.map((message, index) => (
          <div key={index} className={`chatroom-message-container ${message.self ? "self" : "other"}`}>
            <div
              className={`chatroom-message`}
            >
              <p>{message.message}</p>
              <div className={`chatroom-message-date`}>{new Date(message.createdAt).toDateString()}</div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="chatroom-input">
          <input
            type="text"
            placeholder="Type your message here"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  )
}
