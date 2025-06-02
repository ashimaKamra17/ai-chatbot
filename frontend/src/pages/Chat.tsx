import React from "react";
import ChatComponent from "../components/Chat/ChatComponent";

const Chat: React.FC = () => {
  return (
    <div className="max-w-screen-lg mx-auto bg-gray-100 shadow-md">
      <ChatComponent />
    </div>
  );
};

export default Chat;
