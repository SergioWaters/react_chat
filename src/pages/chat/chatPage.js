import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { chatsArr } from '../../resourses/chats.js'

import {
  Layout,
  FuncChat,
  // ClassChat,
  CreateChat,
  ChatList
} from '../../components'

export const ChatPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const listener = ({ code }) => {
      if (code === "Escape") {
        navigate("/chat");
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [navigate]);

  return (
    <Routes>

      <Route
        exact path="/create"
        element={
          <Layout
            chats={<ChatList chats={chatsArr} />}
            messages={<CreateChat />}
          />
        }
      />
      <Route
        path="/chat/*"
        element={
          <Layout
            chats={<ChatList chats={chatsArr} />}
            // ClassMessages={<div>Choose contact to hangout with</div>}
            messages={<div>Choose contact to hangout with</div>}
          />
        }
      />
      <Route
        path="/"
        element={
          <Layout
            chats={<ChatList chats={chatsArr} />}
            // ClassMessages={<div>Choose contact to hangout with</div>}
            messages={<div>Choose contact to hangout with</div>}

          />
        }
      />
      <Route
        path=":contactId"
        element={<Layout
          chats={<ChatList chats={chatsArr} />}
          // ClassMessages={<ClassChat />}
          messages={<FuncChat chats={chatsArr} />}
        />}
      />
    </Routes>
  );
};