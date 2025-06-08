import React from "react";
import { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import { IoCopyOutline } from "react-icons/io5";
import { marked } from "marked";
import { useSnackbar } from "../../context/SnackbarContext";
import { useChat } from "../../context/ChatContext";
import { useTheme } from "../../context/ThemeContext";

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
  const { isDarkMode } = useTheme();

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
        className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-current prose-p:text-current prose-strong:text-current prose-li:text-current"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* <ChatHeader error={error} /> */}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full mt-20">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            } animate-fade-in`}
          >
            {msg.sender === "bot" && (
              <div
                className={`flex-shrink-0 w-10 h-10 ${
                  isDarkMode ? "bg-blue-600" : "bg-blue-500"
                } rounded-full flex items-center justify-center shadow-lg`}
              >
                <span className="text-white">
                  <FaRobotIcon size={20} />
                </span>
              </div>
            )}
            <div
              className={`group relative max-w-[70%] rounded-2xl p-4 ${
                msg.sender === "user"
                  ? `${
                      isDarkMode ? "bg-blue-600" : "bg-blue-500"
                    } text-white rounded-br-none`
                  : `${isDarkMode ? "bg-gray-800" : "bg-white"} ${
                      isDarkMode ? "text-gray-100" : "text-gray-800"
                    } rounded-bl-none shadow-lg border ${
                      isDarkMode ? "border-gray-700" : "border-gray-200"
                    }`
              }`}
            >
              {renderMessageContent(msg.content)}
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleCopyMessage(msg.content)}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
                  title="Copy message"
                >
                  <span
                    className={
                      msg.sender === "user"
                        ? "text-white"
                        : isDarkMode
                        ? "text-gray-300"
                        : "text-gray-600"
                    }
                  >
                    <IoCopyOutlineIcon size={16} />
                  </span>
                </button>
                {msg.requestId && (
                  <span
                    className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-xs text-gray-400"
                    title="Request ID"
                  >
                    {msg.requestId.slice(0, 8)}...
                  </span>
                )}
              </div>
            </div>
            {msg.sender === "user" && (
              <div
                className={`flex-shrink-0 w-10 h-10 ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-600"
                } rounded-full flex items-center justify-center shadow-lg`}
              >
                <span className="text-white">
                  <BsPersonIcon size={20} />
                </span>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start space-x-3 animate-fade-in">
            <div
              className={`flex-shrink-0 w-10 h-10 ${
                isDarkMode ? "bg-blue-600" : "bg-blue-500"
              } rounded-full flex items-center justify-center shadow-lg`}
            >
              <span className="text-white">
                <FaRobotIcon size={20} />
              </span>
            </div>
            <div
              className={`${isDarkMode ? "bg-gray-800" : "bg-white"} ${
                isDarkMode ? "text-gray-100" : "text-gray-800"
              } rounded-2xl p-4 rounded-bl-none shadow-lg border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex space-x-2">
                <div
                  className={`w-2 h-2 ${
                    isDarkMode ? "bg-blue-400" : "bg-blue-500"
                  } rounded-full animate-bounce`}
                />
                <div
                  className={`w-2 h-2 ${
                    isDarkMode ? "bg-blue-400" : "bg-blue-500"
                  } rounded-full animate-bounce delay-100`}
                />
                <div
                  className={`w-2 h-2 ${
                    isDarkMode ? "bg-blue-400" : "bg-blue-500"
                  } rounded-full animate-bounce delay-200`}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input Area */}
      <div
        className={`sticky bottom-0 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        } pt-4 pb-6`}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div
            className={`flex items-center space-x-3 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } rounded-2xl p-2 shadow-lg border ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <input
              type="text"
              placeholder="Type your message..."
              className={`flex-1 p-3 bg-transparent border-none focus:outline-none focus:ring-0 ${
                isDarkMode
                  ? "text-gray-100 placeholder-gray-400"
                  : "text-gray-800 placeholder-gray-400"
              }`}
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              onClick={onSendMessage}
              disabled={isLoading || !input.trim()}
              className={`p-3 rounded-xl transition-all duration-200 flex items-center justify-center w-12 h-12 ${
                isLoading || !input.trim()
                  ? isDarkMode
                    ? "bg-gray-700"
                    : "bg-gray-200"
                  : isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              } ${
                isLoading || !input.trim()
                  ? "cursor-not-allowed"
                  : "transform hover:scale-105 shadow-md"
              }`}
            >
              <span className="text-white">
                <IoSendSharpIcon size={24} />
              </span>
            </button>
          </div>
          <div
            className={`mt-2 text-center text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Press Enter to send, Shift + Enter for new line
          </div>
        </div>
      </div>

      {/* <ChatFooter /> */}
    </div>
  );
};

export default ChatComponent;
