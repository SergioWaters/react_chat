import { React, useEffect } from 'react';
import { Contact } from './Contact';
import { SearchUser } from '../'

import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getContacts, deleteContact } from '../../store/contacts'
import List from '@material-ui/core/List';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  inline: {
    display: 'inline',
  },
}));

export const ChatList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { contactId } = useParams();
  const { messageList } = useSelector((store) => store.messages);
  const { contactList, pendingGet, errorGet } = useSelector((store) => store.contacts);
  const classes = useStyles();

  const deleteContact = async (contact, e) => {
    e.preventDefault();
    dispatch(deleteContact(contact));
    navigate('/#');
  }

  const getMessageColor = (id) => {
    if (contactId === id) return '#00808066';
    else return 'inherit';
  }

  const getLastMessage = (id, key) => {
    return messageList[id]?.[-1]?.[key]
  }

  useEffect(() => {
    if (!Object.keys(contactList).length) {
      dispatch(getContacts());
    }
  }, [dispatch, contactList]);

  return (
    <List className={classes.root}>
      <SearchUser />
      {pendingGet && <h3>{pendingGet}</h3>}
      {errorGet && <h3>{errorGet.message}</h3>}
      {(!pendingGet || !errorGet) &&
        Object.entries(contactList).map((item) =>
          <Link to={`/chat/${item[0]}`}
            key={item[0]}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Contact
              callBack={deleteContact}
              contactId={item[0]}
              author={item[1]}
              text={getLastMessage(item[0], 'text')}
              date={getLastMessage(item[0], 'date')}
              color={getMessageColor(item[0])}
            />
          </Link >
        )
      }
    </List >
  );
}
