import React from "react";
import { SnackbarProvider } from "./SnackbarContext";
import { ChatProvider } from "./ChatContext";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <SnackbarProvider>
      <ChatProvider>{children}</ChatProvider>
    </SnackbarProvider>
  );
};
