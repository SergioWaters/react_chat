import React, { useEffect, useRef, useMemo } from 'react';
import styles from './index.module.css';
import { Message } from '../../components'
import { Button, TextField } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMessage,
  // getMessages,
  createMessage,
  updateMessagesOnChange,
} from "../../store/messages";
import { onMessagesAddedApi } from '../../api/messages';
import { getDate, getId } from '../../resourses/helpers.js'
// import { onValue, onChildAdded, ref, child } from 'firebase/database'
// import { database } from "../../api/firebase";
// import { useCollectionData } from 'react-firebase-hooks'


export const FuncChat = () => {

  const { contactId } = useParams();
  const dispatch = useDispatch();

  const { messageList } = useSelector((store) => store.messages);
  const { contactList } = useSelector((store) => store.contacts);
  const messages = useMemo(() => messageList[contactId] || [], [messageList, contactId]);
  // const [messageArr, loading] = useCollectionData()

  const inputRef = useRef();
  const scrollRef = useRef();

  onMessagesAddedApi('', (s) => {
    s.forEach(v => console.log(v))
  });

  useEffect(() => {
    dispatch(updateMessagesOnChange(contactId))
    // || onValue()
    // if (!messages.length) dispatch(getMessages(contactId));

    inputRef.current?.focus();
    scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, contactId, dispatch]);

  const updateMessageList = (author) => {
    const mess = {
      author: author || 'Me',
      text: inputRef.current?.value,
      date: getDate(),
    };
    if (mess.text) {
      dispatch(createMessage({ ...mess, contactId: contactId }));
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
        <span>{contactList[contactId] + " - " + contactId}</span>
      </div>

      <div className={styles.messageList} ref={scrollRef}>
        {
          (!messages) ? <h5>No messages yet</h5> :
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