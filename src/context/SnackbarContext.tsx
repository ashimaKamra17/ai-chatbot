import React, { createContext, useContext, useState, useCallback } from "react";

interface SnackbarContextType {
  showSnackbar: (message: string, type?: "success" | "error" | "info") => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "info">("success");

  const showSnackbar = useCallback(
    (message: string, type: "success" | "error" | "info" = "success") => {
      setMessage(message);
      setType(type);
      setIsVisible(true);

      // Auto hide after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    },
    []
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {isVisible && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
            type === "success"
              ? "bg-green-500 text-white"
              : type === "error"
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {message}
        </div>
      )}
    </SnackbarContext.Provider>
  );
};
