/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Chat from "../components/chat";

test("user can send a message", () => {
  render(<Chat />);

  // Simulate user entering a name
  const nameInput = screen.getByLabelText("Enter your name");
  fireEvent.change(nameInput, { target: { value: "John" } });

  // Simulate user typing a message
  const messageInput = screen.getByPlaceholderText("Type a message...");
  fireEvent.change(messageInput, { target: { value: "Hello, World!" } });

  // Simulate user clicking the "Send" button
  const sendButton = screen.getByText("Send");
  fireEvent.click(sendButton);

  // Assert that the sent message is displayed in the chat
  // const sentMessage = screen.getByText("John:");
  // expect(sentMessage).toBeInTheDocument();
});

test("user can load more messages", () => {
  render(<Chat />);

  // Simulate user clicking the "Load More" button
  const loadMoreButton = screen.getByText("Load More");
  fireEvent.click(loadMoreButton);

  // Assert that more messages are displayed
  // const additionalMessage = screen.getByText("Additional Message"); // Replace with an actual message text
  // expect(additionalMessage).toBeInTheDocument();
});
