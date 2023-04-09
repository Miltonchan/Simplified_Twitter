import React, { useState } from 'react';
import './Chatroom_component.css'

export default function Chatroom_component() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      setMessages([...messages, { text: inputValue, sender: "me" }]);
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
          <div
            key={index}
            className={`chatroom-message ${message.sender === "me" ? "me" : "other"}`}
          >
            <p>{message.text}</p>
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
