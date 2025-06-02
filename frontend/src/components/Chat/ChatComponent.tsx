import React from "react";
import { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import { IoCopyOutline } from "react-icons/io5";
import { marked } from "marked";
import { useSnackbar } from "../../context/SnackbarContext";
import { useChat } from "../../context/ChatContext";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";

const IoSendSharpIcon = IoSendSharp as unknown as React.FC<{ size?: number }>;
const FaRobotIcon = FaRobot as unknown as React.FC<{ size?: number }>;
const BsPersonIcon = BsPerson as unknown as React.FC<{ size?: number }>;
const IoCopyOutlineIcon = IoCopyOutline as unknown as React.FC<{
  size?: number;
}>;

const ChatComponent: React.FC = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isLoading, error } = useChat();
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
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    const htmlContent = marked.parse(content) as string;

    return (
      <div
        className="prose prose-sm max-w-none prose-headings:text-current prose-p:text-current prose-strong:text-current prose-li:text-current"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* <ChatHeader error={error} /> */}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && (
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white">
                  <FaRobotIcon size={20} />
                </span>
              </div>
            )}
            <div
              className={`group relative max-w-[70%] rounded-lg p-4 ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none shadow-md"
              }`}
            >
              {renderMessageContent(msg.content)}
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleCopyMessage(msg.content)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded hover:bg-gray-100"
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
                {msg.requestId && (
                  <span
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-gray-400"
                    title="Request ID"
                  >
                    {msg.requestId.slice(0, 8)}...
                  </span>
                )}
              </div>
            </div>
            {msg.sender === "user" && (
              <div className="flex-shrink-0 w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white">
                  <BsPersonIcon size={20} />
                </span>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white">
                <FaRobotIcon size={20} />
              </span>
            </div>
            <div className="bg-white text-gray-800 rounded-lg p-4 rounded-bl-none shadow-md">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input Area */}
      <div>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              onClick={onSendMessage}
              disabled={isLoading || !input.trim()}
              className={`p-3 rounded-lg transition-all duration-200 flex items-center justify-center w-12 h-12 ${
                isLoading || !input.trim()
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 transform hover:scale-105"
              }`}
            >
              <span className="text-white">
                <IoSendSharpIcon size={24} />
              </span>
            </button>
          </div>
          <div className="mt-2 text-center text-sm text-gray-500">
            Press Enter to send, Shift + Enter for new line
          </div>
        </div>
      </div>

      {/* <ChatFooter /> */}
    </div>
  );
};

export default ChatComponent;
