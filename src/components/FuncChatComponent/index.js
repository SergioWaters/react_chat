import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.css';
import Message from '../MessageComponent/'

const chatBot = {
  author: "Vlad-bot",
  text: "Have no fear, Vlad is here!",
  id: (new Date() * Math.random()).toString()
};
export default function FuncChatComponent() {
  //
  const [text, setText] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [author, setAuthor] = useState("");

  const ref = useRef();

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    const lastMessage = messageList[messageList.length - 1];
    let timerId = null;

    if (messageList.length && lastMessage?.author !== "Vlad-bot") {
      timerId = setTimeout(() => {
        setMessageList([...messageList, chatBot]);
      }, 1500);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [messageList]);

  const updateMessageList = () => {
    if (text) {
      setMessageList([...messageList, {
        author: author || "Anonim",
        message: text,
        id: (new Date() * Math.random()).toString(),
      }]);
      setText("");
      setAuthor("");
    }
  };


  //
  return (
    <div className={styles.wrapper}>
      <h1>Functional Chat Component</h1>
      <span>{messageList.length} messages total</span>
      <div className={styles.messageList}>
        {
          messageList.map((message) =>
            <Message
              key={message.id}
              author={message.author}
              text={message.text}
              date={(new Date()).toString()}
            />
          )
        }
      </div>
      <div className={styles.messageForm}>
        <input className={styles.messageAuthor}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Name yourself" />

        <textarea className={styles.messageText}
          onChange={(e) => setText(e.target.value)}
          placeholder="put your message here" />

        <button className={styles.messageButton}
          onClick={updateMessageList}>
          Send
        </button>
      </div>
    </div>
  );
}


