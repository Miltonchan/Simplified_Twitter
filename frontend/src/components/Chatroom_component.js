import React, { useState, useEffect } from 'react';
import './Chatroom_component.css';

export default function Chatroom_component() {
  const [messages, setMessages] = useState([]);
  const [chatroom, setChatroom] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const messageData = await fetch('http://localhost:8000/messages',
        {
          method: 'GET',
          mode: 'cors'
        })
        .then(data => data.json());
      setMessages(messageData)
      console.log(messageData);
    }
    fetchMessages();
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
      console.log(chatroomData);
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
          "rmId": 1,
          "userId": 101,
          "message": inputValue,
        })
      })
      .then(data => data.json());
      console.log(response); // log the response data for testing purposes
    } catch (error) {
      console.error(error);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      saveMessage(inputValue);
      setMessages([...messages, { message: inputValue, sender: "me" }]);
      setInputValue("");
    }
  }

  const receiverName = 'Kirito';
  const receiverAvatarUrl = 'https://via.placeholder.com/50';

  return (
    <div className="chatroom-container">
      <div className="chatroom-header">
        <img
          src={receiverAvatarUrl}
          alt={`${receiverName}'s avatar`}
          className="chatroom-receiver-avatar"
        />
        <h2>{receiverName}</h2>
      </div>
      <div className="chatroom-messages">
        {messages.map((message, index) => (
          <div className={`chatroom-message-container ${message.sender === "me" ? "me" : "other"}`}>
            <div
              key={index}
              className={`chatroom-message ${message.sender === "me" ? "me" : "other"}`}
            >
              <p>{message.message}</p>
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
