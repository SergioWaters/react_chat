import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './index.module.css';
import { Message } from '../../components'
import { Button, TextField } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

const getDate = () => {
  return (new Date()).toLocaleString("ru-RU")
}
const getId = () => {
  return (Date.now() * Math.random()).toString()
};

export const FuncChat = ({ chatsArr }) => {

  const { contactId } = useParams();

  const { messageList } = useSelector((store) => store.messages);
  const { contactList } = useSelector((store) => store.contacts);

  const [messList, setMessageList] = useState(messageList);
  const [text, setText] = useState("");
  const [authorsArr] = useState(contactList);

  const dispatch = useDispatch();

  const inputRef = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
    scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messageList]);

  const updateMessageList = useCallback(
    (text, author) => {
      const messArr = messageList[contactId] ?? [];
      const mess = {
        author: author || 'Me',
        text,
        id: getId(),
      };
      if (text) {
        // dispatch(addMessage())
        setMessageList((state) => (
          {
            ...state,
            [contactId]: [...messArr, mess],
          }
        ));
        setText("");
      }
    },
    [contactId, messageList]
  );

  useEffect(() => {
    const messArr = messList[contactId] ?? [];
    const lastMessage = messArr[messArr.length - 1];

    let timerId = null;
    const chatBot = {
      author: "Vlad-bot",
      text: "Have no fear, Vlad is here!",
    };
    if (messArr.length && lastMessage.author !== "Vlad-bot" && contactId === 'bot') {
      timerId = setTimeout(() => {
        setMessageList((state) => (
          {
            ...state,
            [contactId]: [...messArr, chatBot],
          }
        )
        );
      }, 1500);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [messList, contactId]);
  const messages = messList[contactId] ?? []

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <span>Functional Chat Component</span>
          <span>{authorsArr[contactId] + contactId}</span>
          <span>{messages.length} messages total</span>
        </div>
        <div className={styles.messageList} ref={scrollRef}>
          {
            messages.map((message) =>
              <Message
                key={message.id || getId()}
                author={message.author}
                text={message.text}
                date={message.date || getDate()}
              />
            )
          }
        </div>
        <div className={styles.messageForm}>
          {/* <TextField
            id="standard-required"
            label="Name yourself"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          // placeholder="placeholder" 
          /> */}
          <TextField inputRef={inputRef}
            onChange={(e) => setText(e.target.value)}
            id="standard-textarea"
            label="Put your message here"
            multiline
            value={text}
            className={styles.input}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => updateMessageList(text)}
            className={styles.input}
          >
            send
          </Button>
        </div>
      </div>
    </>
  );
}