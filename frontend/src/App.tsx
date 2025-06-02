import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import { AppProvider } from "./context/AppProvider";
import "./App.css";
import Layout from "./components/Layout";
import ChatPage from "./pages/ChatPage";

const App: React.FC = () => {
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <ChatPage />
              </Layout>
            }
          />
          <Route
            path="/chat"
            element={
              <Layout>
                <ChatPage />
              </Layout>
            }
          />
          <Route
            path="/chat/:chatId"
            element={
              <Layout>
                <ChatPage />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={!isAuthenticated() ? <Login /> : <Navigate to="/chat" />}
          />
          <Route
            path="/signup"
            element={!isAuthenticated() ? <Signup /> : <Navigate to="/chat" />}
          />
          <Route
            path="/"
            element={<Navigate to={isAuthenticated() ? "/chat" : "/login"} />}
          />
        </Routes>
      </AppProvider>
    </Router>
  );
};

export default App;
