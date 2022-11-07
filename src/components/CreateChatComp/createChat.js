import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.css';
import { Button, TextField, ListItem, List } from '@material-ui/core'
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../../store/contacts";
// import { addMsg } from "../../store/messages";
import { useNavigate } from "react-router-dom";
import { getDate, getId } from '../../resourses/helpers.js'

export const CreateChat = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { contactList } = useSelector((store) => store.contacts)
  const [author, setAuthor] = useState('');
  const [id, setId] = useState('');
  const [text, setText] = useState('');

  const getContact = (e) => {
    const id = e.target.getAttribute('data-id');
    const author = e.target.innerText;
    setId(id);
    setAuthor(author);
  }

  const sendContact = async () => {
    const sendTo = Object.keys(contactList).includes(id) ? id : getId();
    if (author && sendTo) {
      dispatch(createContact({
        id: sendTo,
        author: author
      }
      ));
    }
    navigate(`/chat/${sendTo}`)
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [contactList]);

  return (
    <>
      <div className={styles.wrapper}>
        Your common contacts:
        <List className={styles.list}>
          {
            Object.entries(contactList).map((author) => {
              return <ListItem
                className={styles.listItem}
                data-id={author[0]}
                key={author[0]}
                onClick={(e) => getContact(e)}
              >
                {author[1]}
              </ListItem>
            })
          }
        </List>
        <div className={styles.messageForm}>

          <TextField inputRef={inputRef}
            id="standard-required"
            label="Who do you whant to hangout with?"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            inputProps={{
              "data-name": "author",
            }}
          />

          <TextField
            onChange={(e) => setText(e.target.value)}
            id="standard-textarea"
            label="Put your message here"
            multiline
            value={text}
            inputProps={{
              "data-name": "text",
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => sendContact()}
          >
            send
          </Button>

        </div>
      </div>
    </>
  );
}