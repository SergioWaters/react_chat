import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import {
  Layout,
  FuncChat,
  CreateChat,
  ChatList
} from '../../components'

export const ChatPage = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const listener = ({ code }) => {
      if (code === "Escape") navigate("/chat");
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [navigate]);

  return (
    <Routes>
      <Route
        path="/create"
        element={
          <Layout
            chats={<ChatList />}
            messages={<CreateChat />}
          />
        }
      />
      <Route
        exact path="/"
        element={
          <Layout
            chats={<ChatList />}
            messages={<div>Choose contact to hangout with</div>}
          />
        }
      />
      <Route
        path=":contactId"
        element={<Layout
          chats={<ChatList />}
          messages={<FuncChat />}
        />}
      />
    </Routes>
  );
};