function handleSendMessage(
  userName: string,
  newMessage: string,
  messages: any[],
  setMessages: any,
  setNewMessage: any
) {
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
}

export { handleSendMessage };
