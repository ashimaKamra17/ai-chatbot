import React from "react";
import GlobalHeader from "./GlobalHeader";
import Sidebar from "./Sidebar";
import { useChat } from "../context/ChatContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { error } = useChat();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <GlobalHeader />
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
