// src/Chat.js
import React, { useState, useEffect, CSSProperties } from "react";
import { handleSendMessage } from "./utils";
import { Button, Col, Divider, Input, Row } from "antd";

const chatStyles: CSSProperties = {
  border: "4px solid blue",
  padding: 24,
};

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const pageSize = 25;
  const [currentPage, setCurrentPage] = useState(1);

  const visibleMessages = messages.slice(0, currentPage * pageSize);
  const userMessages = messages.filter((message) => message.user === userName);

  function loadMoreMessages() {
    setCurrentPage(currentPage + 1);
  }

  function handleNameChange(e) {
    setUserName(e.target.value);
  }

  function handleNewMessageChange(e) {
    setNewMessage(e.target.value);
  }

  useEffect(() => {
    const storedMessages =
      JSON.parse(localStorage.getItem("chatMessages") || "[]") || [];
    setMessages(storedMessages);
  }, []);

  useEffect(() => {
    // Initialize messages from local storage
    const storedMessages =
      JSON.parse(localStorage.getItem("chatMessages")) || [];
    setMessages(storedMessages);

    // Listen for changes in local storage (messages from other tabs)
    const handleStorageChange = (e) => {
      if (e.key === "chatMessages") {
        const updatedMessages = JSON.parse(e.newValue) || [];
        setMessages(updatedMessages);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div style={{ padding: "0px 64px" }}>
      <Row gutter={12} justify="end" style={{ marginBottom: 12 }}>
        <Col span={12}>
          <label htmlFor="nameInput">Enter your name:</label>
          <Input
            aria-label="Enter your name"
            placeholder="Basic usage"
            id="nameInput"
            value={userName}
            onChange={handleNameChange}
          />
        </Col>
      </Row>
      <Row gutter={12} justify="space-between" style={{ height: "70vh" }}>
        <Col span={12} style={chatStyles}>
          <h1>ALL chats</h1>
          <Divider />
          {visibleMessages.map((message, index) => (
            <div key={index} className="message">
              <strong>{message.user}:</strong> {message.text}
            </div>
          ))}

          {messages.length > visibleMessages.length && (
            <Button onClick={loadMoreMessages}>Load More</Button>
          )}
        </Col>
        <Col span={12} style={chatStyles}>
          <Row justify="end">
            <h1>USER chats</h1>
            <Divider />
            <Row justify="end">
              <Col>
                {userMessages.map((message, index) => (
                  <div key={index} style={{ textAlign: "end" }}>
                    {message.text}
                  </div>
                ))}
              </Col>
            </Row>
            <Divider />
          </Row>
          <Row justify="end" gutter={4}>
            <Col>
              <Input
                placeholder="Type a message..."
                id="nameMessage"
                value={newMessage}
                onChange={handleNewMessageChange}
              />
            </Col>
            <Col span={8}>
              <Button
                onClick={() =>
                  handleSendMessage(
                    userName,
                    newMessage,
                    messages,
                    setMessages,
                    setNewMessage
                  )
                }
              >
                Send
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
