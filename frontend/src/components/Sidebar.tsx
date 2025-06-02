import React, { useState } from "react";
import { FaRobot, FaBars, FaTimes, FaSync } from "react-icons/fa";
import { useChat } from "../context/ChatContext";
import { useSnackbar } from "../context/SnackbarContext";

const FaRobotIcon = FaRobot as unknown as React.FC<{ size?: number }>;
const FaBarsIcon = FaBars as unknown as React.FC<{ size?: number }>;
const FaTimesIcon = FaTimes as unknown as React.FC<{ size?: number }>;
const FaSyncIcon = FaSync as unknown as React.FC<{ size?: number }>;

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    chatSessions,
    fetchMessageHistory,
    clearMessages,
    loadChatById,
    startNewChat,
  } = useChat();
  const { showSnackbar } = useSnackbar();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleRefresh = async () => {
    try {
      await fetchMessageHistory();
      showSnackbar("Chat history refreshed", "success");
    } catch (error) {
      showSnackbar("Failed to refresh chat history", "error");
    }
  };

  const handleClearHistory = async () => {
    try {
      clearMessages();
      startNewChat();
      showSnackbar("Chat history cleared", "success");
    } catch (error) {
      showSnackbar("Failed to clear chat history", "error");
    }
  };

  const handleChatClick = async (chatId: string) => {
    try {
      await loadChatById(chatId);
      setIsOpen(false); // Close sidebar after loading chat
    } catch (error) {
      showSnackbar("Failed to load chat", "error");
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
      >
        {isOpen ? <FaTimesIcon size={24} /> : <FaBarsIcon size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-blue-600">
                  <FaRobotIcon size={24} />
                </span>
                <h2 className="text-xl font-semibold text-gray-800">
                  Chat History
                </h2>
              </div>
              <button
                onClick={handleRefresh}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
                title="Refresh history"
              >
                <FaSyncIcon size={20} />
              </button>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {chatSessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => handleChatClick(session.id)}
                  className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">
                      {formatDate(session.createdAt)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {
                        session.messages.filter((msg) => msg.sender === "user")
                          .length
                      }{" "}
                      questions
                    </span>
                  </div>
                  <div className="space-y-2">
                    {session.messages
                      .filter((msg) => msg.sender === "user")
                      .slice(0, 2)
                      .map((msg) => (
                        <div key={msg.id} className="text-sm">
                          <span className="text-gray-700 line-clamp-1">
                            {msg.content}
                          </span>
                        </div>
                      ))}
                    {session.messages.filter((msg) => msg.sender === "user")
                      .length > 2 && (
                      <div className="text-xs text-gray-500">
                        +
                        {session.messages.filter((msg) => msg.sender === "user")
                          .length - 2}{" "}
                        more questions
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleClearHistory}
              className="w-full py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              Clear History
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
