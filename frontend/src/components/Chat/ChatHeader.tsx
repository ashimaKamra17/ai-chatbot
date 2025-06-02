import React from "react";
import { FaRobot } from "react-icons/fa";

const FaRobotIcon = FaRobot as unknown as React.FC<{ size?: number }>;

interface PageHeaderProps {
  error?: string | null;
}

const PageHeader: React.FC<PageHeaderProps> = ({ error }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <span className="text-white">
              <FaRobotIcon size={28} />
            </span>
            <h1 className="text-2xl font-bold">AI Chat Assistant</h1>
          </div>
          <div className="flex items-center space-x-4">
            {error && (
              <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
