// src/Chat.js
import React, { useState, useEffect } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedMessages =
      JSON.parse(localStorage.getItem("chatMessages") || "[]") || [];
    setMessages(storedMessages);
  }, []);

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (userName && newMessage) {
      const newMessageObj = {
        user: userName,
        text: newMessage,
      };

      const updatedMessages = [...messages, newMessageObj];
      setMessages(updatedMessages);
      localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
      setNewMessage("");
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="nameInput">Enter your name:</label>
        <input
          type="text"
          id="nameInput"
          value={userName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <div className="message-list">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <strong>{message.user}:</strong> {message.text}
            </div>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={handleNewMessageChange}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
