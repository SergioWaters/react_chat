import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// import { chatsArr } from '../../resourses/chats.js'
import { useDispatch, useSelector } from "react-redux";

import {
  Layout,
  FuncChat,
  // ClassChat,
  CreateChat,
  ChatList
} from '../../components'

export const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chats = useSelector((state) => state.contacts);
  const [chatsArr, setChats] = useState(chats);

  const updateChats = (newChat) => {
    const find = chatsArr.findIndex((chat) => chat.author === newChat.author);
    let chatId = null;
    if (find >= 0) {
      const ml = [...chatsArr[find].messageList, ...newChat.messageList];
      chatsArr[find].messageList = ml;
      chatId = chatsArr[find].id;
    } else {
      setChats([newChat, ...chatsArr]);
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