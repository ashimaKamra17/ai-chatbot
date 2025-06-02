import React from "react";
import ChatComponent from "../components/Chat/ChatComponent";
import { useChat } from "../context/ChatContext";

const ChatPage: React.FC = () => {
  const { error } = useChat();

  return <ChatComponent />;
};

export default ChatPage;
