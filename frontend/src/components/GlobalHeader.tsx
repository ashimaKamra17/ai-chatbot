import React from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaSignOutAlt } from "react-icons/fa";

const FaRobotIcon = FaRobot as unknown as React.FC<{ size?: number }>;
const FaSignOutAltIcon = FaSignOutAlt as unknown as React.FC<{ size?: number }>;

const GlobalHeader: React.FC = () => {
  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log("Logout clicked");
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <span className="text-blue-600">
                <FaRobotIcon size={24} />
              </span>
              <span className="text-xl font-bold text-gray-900">
                AI Assistant
              </span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium">U</span>
              </div>
              <span className="hidden md:block">User</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              title="Logout"
            >
              <FaSignOutAltIcon size={20} />
              <span className="hidden md:block">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;
