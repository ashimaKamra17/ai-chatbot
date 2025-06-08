import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  requestId?: string;
}

interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatContextType {
  messages: Message[];
  chatSessions: ChatSession[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  fetchMessageHistory: () => Promise<void>;
  loadChatById: (chatId: string) => Promise<void>;
  startNewChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

interface ChatProviderProps {
  children: React.ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchMessageHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get("/chat/history");
      const sessions: ChatSession[] = response.data.map((session: any) => ({
        id: session._id,
        messages: session.messages.map((msg: any) => ({
          id: msg._id,
          content: msg.content,
          sender: msg.sender,
          timestamp: new Date(msg.timestamp),
          requestId: msg.requestId,
        })),
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt),
      }));

      setChatSessions(sessions);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching message history"
      );
      console.error("Error fetching message history:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const requestId = uuidv4();
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: "user",
      timestamp: new Date(),
      requestId,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post(
        "/chat/message",
        {
          message: content,
        },
        {
          headers: {
            "X-Request-ID": requestId,
          },
        }
      );

      const botMessage: Message = {
        id: uuidv4(),
        content: response.data.messages[1].content,
        sender: "bot",
        timestamp: new Date(),
        requestId,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while sending the message"
      );
      console.error("Error sending message:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setChatSessions([]);
    setError(null);
  }, []);

  const loadChatById = useCallback(
    async (chatId: string) => {
      console.log("loadChatById called with chatId:", chatId);
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get(`/chat/chat/${chatId}`);
        const chat = response.data;
        const formattedMessages = chat.messages.map((msg: any) => ({
          id: msg._id,
          content: msg.content,
          sender: msg.sender,
          timestamp: new Date(msg.timestamp),
          requestId: msg.requestId,
        }));

        setMessages(formattedMessages);
        navigate(`/chat/c/${chatId}`);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while loading the chat"
        );
        console.error("Error loading chat:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  const startNewChat = useCallback(() => {
    setMessages([]);
    navigate("/chat");
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        chatSessions,
        isLoading,
        error,
        sendMessage,
        clearMessages,
        fetchMessageHistory,
        loadChatById,
        startNewChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
