import React, { useEffect, useRef, useMemo } from "react";
import styles from "./index.module.css";
import { Message } from "../../components";
import { Button, TextField } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMessage,
  createMessage,
  updateMessagesOnChange,
  getMessagesSuccess,
} from "../../store/messages";
import { onMessagesAddedApi } from "../../api/messagesApi";
import { getId, getFormattedDate } from "../../resourses/helpers";

export const FuncChat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();
  const scrollRef = useRef();

  const { contactId } = useParams();
  const { messageList, errorCreate } = useSelector((store) => store.messages);
  const { contactList } = useSelector((store) => store.contacts);
  const { profile } = useSelector((store) => store.profile);
  const messages = useMemo(
    () => messageList[contactId] || [],
    [messageList, contactId]
  );

  useEffect(() => {
    if (contactId && !contactList[contactId]) navigate("/");
  }, [contactList, contactId, navigate]);

  useEffect(() => {
    scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    inputRef.current?.focus();
  }, [messages]);

  useEffect(() => {
    const unSub = onMessagesAddedApi(contactId, (data) => {
      const messArr = {
        key: contactId,
        messages: data.data().messages,
      };
      dispatch(getMessagesSuccess(messArr));
      console.log(data.data().messages);
    });

    return () => {
      unSub();
    };
  }, [contactId, dispatch]);

  const sendMessage = () => {
    const mess = {
      id: getId(),
      author: profile.displayName,
      text: inputRef.current?.value,
      date: Date.now(),
    };
    if (mess.text) {
      dispatch(createMessage(mess, contactId));
      inputRef.current.value = "";
    }
  };

  const removeMessage = (id) => {
    if (id) dispatch(deleteMessage({ id, contactId }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <span>Functional Chat Component</span>
        <span>{contactList[contactId]?.displayName + " - " + contactId}</span>
        <span>Error: {JSON.stringify(errorCreate)}</span>
      </div>

      <div className={styles.messageList} ref={scrollRef}>
        {!messages.length ? (
          <h5>No messages yet</h5>
        ) : (
          messages.map(({ id, author, text, date }) => (
            <Message
              style={{ alignSelf: "right" }}
              key={id}
              messId={id}
              author={author === profile.displayName ? "You" : author}
              text={text}
              date={getFormattedDate(date)}
              callBack={removeMessage}
            />
          ))
        )}
      </div>

      <div className={styles.messageForm}>
        <TextField
          inputRef={inputRef}
          id="standard-textarea"
          label="Put your message here"
          multiline
          className={styles.input}
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          send
        </Button>
      </div>
    </div>
  );
};
