import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.css';
import { Message } from '../../components'
import { Button, TextField } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { addMsg } from "../../store/messages";
import { getDate, getId } from '../../resourses/helpers.js'

export const FuncChat = () => {

  const { contactId } = useParams();
  const navigate = useNavigate();
  const { messageList } = useSelector((store) => store.messages);
  const { contactList } = useSelector((store) => store.contacts);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const inputRef = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
    scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messageList]);

  const updateMessageList = (text, author) => {
    const mess = {
      author: author || 'Me',
      text,
      id: getId(),
    };
    if (text) {
      dispatch(addMsg({ ...mess, contactId: contactId }));
      setText("");
    }
  };

  useEffect(() => {
    if (!contactList[contactId]) navigate('/chat/create')
  }, [contactList, contactId, navigate]);

  useEffect(() => {
    const messArr = messageList[contactId] ?? [];
    const lastMessage = messArr[messArr.length - 1];

    let timerId = null;
    const chatBot = {
      author: "Vlad-bot",
      text: "Have no fear, Vlad is here!",
    };
    if (messArr.length && lastMessage.author !== "Vlad-bot" && contactId === 'bot') {
      timerId = setTimeout(() => {
        dispatch(addMsg({ ...chatBot, contactId: contactId }));
      }, 1500);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [messageList, contactId, dispatch]);

  const messages = messageList[contactId] ?? [];
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <span>Functional Chat Component</span>
          <span>{contactList[contactId] + " - " + contactId}</span>
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