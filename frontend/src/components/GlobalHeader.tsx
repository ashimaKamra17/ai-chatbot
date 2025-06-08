import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaMoon, FaSun, FaPlus, FaChevronDown } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { BsBell } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useChat } from "../context/ChatContext";

const FaRobotIcon = FaRobot as unknown as React.FC<{
  size?: number;
  className?: string;
}>;
const FaMoonIcon = FaMoon as unknown as React.FC<{
  size?: number;
  className?: string;
}>;
const FaSunIcon = FaSun as unknown as React.FC<{
  size?: number;
  className?: string;
}>;
const FaPlusIcon = FaPlus as unknown as React.FC<{
  size?: number;
  className?: string;
}>;
const FaChevronDownIcon = FaChevronDown as unknown as React.FC<{
  size?: number;
  className?: string;
}>;
const IoSettingsOutlineIcon = IoSettingsOutline as unknown as React.FC<{
  size?: number;
  className?: string;
}>;
const BsBellIcon = BsBell as unknown as React.FC<{
  size?: number;
  className?: string;
}>;
const FaSignOutAltIcon = FaSignOutAlt as unknown as React.FC<{
  size?: number;
  className?: string;
}>;

const GlobalHeader: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { startNewChat } = useChat();
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("GPT-3.5");

  const models = [
    { id: "gpt-3.5", name: "GPT-3.5", description: "Fast and efficient" },
    { id: "gpt-4", name: "GPT-4", description: "Most capable model" },
    { id: "claude-3", name: "Claude 3", description: "Advanced reasoning" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    setIsModelDropdownOpen(false);
    // TODO: Implement model switching logic
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-gray-100 dark:border-dark-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                ChatBot
              </span>
            </Link>
            {/* New Chat Button */}
            <button
              onClick={startNewChat}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-card dark:to-dark-bg hover:from-gray-100 hover:to-gray-200 dark:hover:from-dark-bg dark:hover:to-dark-card text-gray-700 dark:text-gray-200 rounded-xl transition-all duration-200 shadow-sm"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-1.5 rounded-lg">
                <FaPlusIcon size={14} className="text-white" />
              </div>
              <span className="text-sm font-medium">New Chat</span>
            </button>

            {/* Model Selector */}
            <div className="relative">
              <button
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-card rounded-xl transition-all duration-200"
              >
                <FaRobotIcon size={16} />
                <span className="text-sm font-medium">{selectedModel}</span>
                <FaChevronDownIcon
                  size={12}
                  className={`transform transition-transform duration-200 ${
                    isModelDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isModelDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl bg-white dark:bg-dark-card shadow-lg border border-gray-100 dark:border-dark-border overflow-hidden z-50">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => handleModelSelect(model.id)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors duration-200 ${
                        selectedModel === model.id
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : ""
                      }`}
                    >
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {model.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {model.description}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation and Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-dark-card rounded-xl transition-all duration-200"
            >
              {isDarkMode ? <FaSunIcon size={20} /> : <FaMoonIcon size={20} />}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;
