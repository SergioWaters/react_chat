import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.css';
import { Message } from '../../components'
import { Button, TextField } from '@material-ui/core'

const chatBot = {
  author: "Vlad-bot",
  text: "Have no fear, Vlad is here!",
  id: (Date.now() * Math.random()).toString(),
  date: new Date().toLocaleString('ru-RU')
};
export const FuncChatComp = () => {

  const [messageList, setMessageList] = useState([]);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const inputRef = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
    scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messageList]);

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
        author: author || "Anonimous",
        text: text,
        id: (Date.now() * Math.random()).toString(),
      }]);
    }
    setText('')
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h3>Functional Chat Component <span>{messageList.length} messages total</span></h3>
        <div className={styles.messageList} ref={scrollRef}>
          {
            messageList.map((message) =>
              <Message
                key={message.id}
                author={message.author}
                text={message.text}
                date={(new Date()).toLocaleString("ru-RU")
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
            // endIcon={<Icon>send</Icon>}
            onClick={updateMessageList}
          >
            send
          </Button>

        </div>
      </div>
    </>
  );
}


