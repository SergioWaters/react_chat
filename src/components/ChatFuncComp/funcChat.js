import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.css';
import { Message } from '../../components'
import { Button, TextField } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { addMsgMidWare, deleteMsg } from "../../store/messages";
import { getDate, getId } from '../../resourses/helpers.js'

export const FuncChat = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contactId } = useParams();
  const { messageList } = useSelector((store) => store.messages);
  const { contactList } = useSelector((store) => store.contacts);
  const [text, setText] = useState("");

  const inputRef = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
    scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messageList]);

  const updateMessageList = (author) => {
    const mess = {
      author: author || 'Me',
      text,
      id: getId(),
    };
    if (text) {
      dispatch(addMsgMidWare({ ...mess, contactId: contactId }));
      setText("");
    }
  };

  const handler = (id) => {
    if (id) dispatch(deleteMsg({ messId: id, contactId: contactId }));
  }

  useEffect(() => {
    if (!contactList[contactId]) navigate('/chat')
  }, [contactList, contactId, navigate]);

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
                messId={message.id || getId()}
                author={message.author}
                text={message.text}
                date={message.date || getDate()}
                callBack={handler}
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
            onClick={() => updateMessageList()}
            className={styles.input}
          >
            send
          </Button>
        </div>
      </div>
    </>
  );
}