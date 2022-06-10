import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './index.module.css';
import { Message } from '../../components'
import { Button, TextField } from '@material-ui/core'
import { useParams } from 'react-router-dom'

const getDate = () => {
  return (new Date()).toLocaleString("ru-RU")
}
const getId = () => {
  return (Date.now() * Math.random()).toString()
};

export const FuncChat = (props) => {
  const getAllChats = Object.assign({}, ...props.chats.map(obj => ({
    [obj.id]: obj.messageList
  })));

  const { contactId } = useParams();

  const [messageList, setMessageList] = useState(getAllChats);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

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
        setMessageList((state) => (
          {
            ...state,
            [contactId]: [...messArr, mess],
          }
        )
        );
        setText("");
      }
    },
    [contactId, messageList]
  );

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
  }, [messageList, contactId]);




  const messages = messageList[contactId] ?? []
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <span>Functional Chat Component</span>
          <span>{messages[0]?.author}</span>
          <span>{messages.length} messages total</span>
        </div>
        <div className={styles.messageList} ref={scrollRef}>
          {
            messages.map((message) =>
              <Message
                key={message.id || getId()}
                author={message.author}
                text={message.text}
                date={message.date || getDate()
                }
              />
            )
          }
        </div>
        <div className={styles.messageForm}>

          <TextField
            id="standard-required"
            label="Name yourself"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          // placeholder="placeholder" 
          />

          <TextField inputRef={inputRef}
            onChange={(e) => setText(e.target.value)}
            // placeholder="Put your message here"
            id="standard-textarea"
            label="Put your message here"
            multiline
            value={text}
          />

          <Button
            variant="contained"
            color="primary"
            // sendIcon={<Icon>send</Icon>}
            onClick={() => updateMessageList(text, author)}
          >
            send
          </Button>

        </div>
      </div>
    </>
  );
}


