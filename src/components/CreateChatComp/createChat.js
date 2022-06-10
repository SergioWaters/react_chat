import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.css';
import { Button, TextField } from '@material-ui/core'
import { useParams } from 'react-router-dom'

const getDate = () => {
  return (new Date()).toLocaleString("ru-RU")
}
const getId = () => {
  return (Date.now() * Math.random()).toString()
};

export const CreateChat = (props) => {
  // const getAllAuthors = [new Set(props.chats.author)]

  const { contactId } = useParams();
  const [message, setMessageList] = useState();
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, [message]);

  const updateMessageList = (text, author) => {
    const messArr = message ?? {};
    const mess = {
      author: author,
      id: getId(),
      messageList: [{
        author: author,
        text: text,
        date: getDate(),
        id: getId()
      }],
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
  };
  return (
    <>
      {/* <div>
        {
          getAllAuthors.map((author) => {
            return <><span key={author}>{author}</span></>
          })
        }
      </div> */}
      <div className={styles.messageForm}>

        <TextField
          id="standard-required"
          label="Who you whant to hangout?"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />

        <TextField inputRef={inputRef}
          onChange={(e) => setText(e.target.value)}
          id="standard-textarea"
          label="Put your message here"
          multiline
          value={text}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => updateMessageList(text, author)}
        >
          send
        </Button>

      </div>
    </>
  );
}