import React from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatPage from "./pages/ChatPage";
import Layout from "./components/Layout";

const AppRoutes: React.FC = () => {
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  return (
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
        path="/chat/c/:chatId"
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
  );
};

export default AppRoutes;
