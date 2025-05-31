import React from "react";
import { useState } from "react";
import useChatbot from "../hooks/useChatbot";
import { FaRobot } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import { IoCopyOutline } from "react-icons/io5";
import { marked } from "marked";
import { useSnackbar } from "../context/SnackbarContext";

const IoSendSharpIcon = IoSendSharp as unknown as React.FC<{ size?: number }>;
const FaRobotIcon = FaRobot as unknown as React.FC<{ size?: number }>;
const BsPersonIcon = BsPerson as unknown as React.FC<{ size?: number }>;
const IoCopyOutlineIcon = IoCopyOutline as unknown as React.FC<{
  size?: number;
}>;

const ChatComponent: React.FC = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChatbot();
  const { showSnackbar } = useSnackbar();

  const onSendMessage = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    showSnackbar("Message copied to clipboard", "success");
  };

  const renderMessageContent = (content: string) => {
    // Configure marked options
    marked.setOptions({
      breaks: true, // Convert line breaks to <br>
      gfm: true, // GitHub Flavored Markdown
    });

    // Convert markdown to HTML
    const htmlContent = marked.parse(content) as string;

    return (
      <div
        className="prose prose-sm max-w-none prose-headings:text-current prose-p:text-current prose-strong:text-current prose-li:text-current"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center space-x-2">
        <span className="text-blue-500">
          <FaRobotIcon size={24} />
        </span>
        <h1 className="text-xl font-semibold text-gray-800">
          AI Chat Assistant
        </h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && (
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white">
                  <FaRobotIcon size={16} />
                </span>
              </div>
            )}
            <div
              className={`group relative max-w-[70%] rounded-lg p-3 ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none shadow-md"
              }`}
            >
              {renderMessageContent(msg.content)}
              <button
                onClick={() => handleCopyMessage(msg.content)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded hover:bg-gray-100"
                title="Copy message"
              >
                <span
                  className={
                    msg.sender === "user" ? "text-white" : "text-gray-600"
                  }
                >
                  <IoCopyOutlineIcon size={16} />
                </span>
              </button>
            </div>
            {msg.sender === "user" && (
              <div className="flex-shrink-0 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                <span className="text-white">
                  <BsPersonIcon size={16} />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={() => onSendMessage()}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center w-10 h-10"
          >
            <span className="text-white">
              <IoSendSharpIcon size={20} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
