import React, { useEffect, useRef, useMemo } from 'react';
import styles from './index.module.css';
import { Message } from '../../components'
import { Button, TextField } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMessage,
  createMessage,
  updateMessagesOnChange,
} from "../../store/messages";
import { onMessagesAddedApi } from '../../api/messagesApi';

export const FuncChat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const inputRef = useRef();
  const scrollRef = useRef();

  const { contactId } = useParams();
  const { messageList } = useSelector((store) => store.messages);
  const { contactList } = useSelector((store) => store.contacts);
  const messages = useMemo(() => messageList[contactId] || [], [messageList, contactId]);


  useEffect(() => {
    if (contactId && !contactList[contactId]) navigate('/')
  }, [contactList, contactId, navigate])

  useEffect(() => {
    dispatch(updateMessagesOnChange(contactId));
    inputRef.current?.focus();
    scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, contactId, dispatch]);

  const sendMessage = () => {
    const mess = inputRef.current?.value;
    if (mess) {
      dispatch(createMessage(mess, contactId));
      inputRef.current.value = '';
    }
  };

  const handler = (id) => {
    if (id) dispatch(deleteMessage({ id, contactId }));
  }

  return (

    <div className={styles.wrapper}>
      <div className={styles.title}>
        <span>Functional Chat Component</span>
        <span>{contactList[contactId]?.displayName + " - " + contactId}</span>
      </div>

      <div className={styles.messageList} ref={scrollRef}>
        {
          // (!messages) ? <h5>No messages yet</h5> :
          // messages.map((message) =>
          //   <Message
          //     key={message.id || getId()}
          //     messId={message.id || getId()}
          //     author={message.author}
          //     text={message.text}
          //     date={message.date || getDate()}
          //     callBack={handler}
          //   />
          // )
        }
      </div>

      <div className={styles.messageForm}>
        <TextField inputRef={inputRef}
          id="standard-textarea"
          label="Put your message here"
          multiline
          className={styles.input}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateMessageList()}
        >
          send
        </Button>
      </div>
    </div>

  );
}