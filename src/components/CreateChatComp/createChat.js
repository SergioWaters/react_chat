import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.css';
import { Button, TextField } from '@material-ui/core'

const getDate = () => {
  return (new Date()).toLocaleString("ru-RU")
}
const getId = () => {
  return Math.floor((Date.now() * Math.random()).toString())
};

export const CreateChat = ({ getChat, chatsArr }) => {

  const [authorsArr] = useState(chatsArr);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, [authorsArr]);

  const createNewChat = () => {
    const mess = {
      author: author,
      id: getId(),
      messageList: [{
        author: 'Me',
        text: text,
        date: getDate(),
        id: getId()
      }],
    };
    if (text && author) {
      setText("");
      setAuthor("");
      getChat(mess);
    }
  };
  return (
    <>
      <div className={styles.wrapper}>
        Your common contacts:
        <ul className={styles.list}>
          {
            authorsArr.map((author) => {
              return <li key={author}
                className={styles.listItem}
                onClick={(e) => setAuthor(e.target.textContent)}
              >
                {author}
              </li>
            })
          }
        </ul>
        <div className={styles.messageForm}>

          <TextField inputRef={inputRef}
            id="standard-required"
            label="Who do you whant to hangout with?"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />

          <TextField
            onChange={(e) => setText(e.target.value)}
            id="standard-textarea"
            label="Put your message here"
            multiline
            value={text}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => createNewChat()}
          >
            send
          </Button>

        </div>
      </div>
    </>
  );
}