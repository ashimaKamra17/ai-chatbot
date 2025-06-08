import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (isOpen) {
      fetchMessageHistory();
    }
  }, [isOpen]);

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
        className="fixed top-4 left-4 z-50 p-2 rounded-xl text-gray-600 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-dark-card transition-all duration-200"
      >
        {isOpen ? <FaTimesIcon size={24} /> : <FaBarsIcon size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-dark-bg backdrop-blur-md shadow-lg transform transition-all duration-300 ease-in-out z-50 border-r border-gray-100 dark:border-dark-border ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full bg-white dark:bg-dark-bg">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-100 dark:border-dark-border bg-white dark:bg-dark-bg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-2 rounded-xl shadow-lg">
                  <span className="text-white">
                    <FaRobotIcon size={24} />
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-dark-text">
                  Chat History
                </h2>
              </div>
              <button
                onClick={handleRefresh}
                className="p-2 text-gray-600 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-dark-card rounded-xl transition-all duration-200"
                title="Refresh history"
              >
                <FaSyncIcon size={20} />
              </button>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-dark-bg">
            <div className="space-y-4">
              {chatSessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => handleChatClick(session.id)}
                  className="p-3 rounded-xl bg-gray-50 dark:bg-dark-card hover:bg-gray-100 dark:hover:bg-dark-card transition-all duration-200 cursor-pointer border border-gray-100 dark:border-dark-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 dark:text-dark-text-secondary">
                      {formatDate(session.createdAt)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-dark-text-secondary">
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
                          <span className="text-gray-700 dark:text-dark-text line-clamp-1">
                            {msg.content}
                          </span>
                        </div>
                      ))}
                    {session.messages.filter((msg) => msg.sender === "user")
                      .length > 2 && (
                      <div className="text-xs text-gray-500 dark:text-dark-text-secondary">
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
          <div className="p-4 border-t border-gray-100 dark:border-dark-border bg-white dark:bg-dark-bg">
            <button
              onClick={handleClearHistory}
              className="w-full py-2 px-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200"
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
