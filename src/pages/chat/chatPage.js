import { useEffect, useState } from "react";
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

  const [authorsArr] = useState([...new Set(chatsArr.map((c) => c.author))]);

  const navigate = useNavigate();
  const [chats, setChats] = useState(chatsArr);

  const updateChats = (newChat) => {
    const find = chats.findIndex((chat) => chat.author === newChat.author);
    let chatId = null;

    if (find >= 0) {
      const ml = [...chats[find].messageList, ...newChat.messageList];
      chats[find].messageList = ml;
      chatId = chats[find].id;
    } else {
      const newChatsArr = [newChat, ...chats];
      setChats(newChatsArr);
      chatId = newChat.id
    }
    navigate(`/chat/${chatId}`);
  }

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
            chats={<ChatList chatsArr={chats} />}
            messages={<CreateChat getChat={updateChats} chatsArr={authorsArr} />}
          />
        }
      />
      <Route
        exact path="/"
        element={
          <Layout
            chats={<ChatList chatsArr={chats} />}
            // ClassMessages={<div>Choose contact to hangout with</div>}
            messages={<div>Choose contact to hangout with</div>}

          />
        }
      />
      <Route
        path=":contactId"
        element={<Layout
          chats={<ChatList chatsArr={chats} />}
          // ClassMessages={<ClassChat />}
          messages={<FuncChat chats={chats} />}
        />}
      />
    </Routes>
  );
};