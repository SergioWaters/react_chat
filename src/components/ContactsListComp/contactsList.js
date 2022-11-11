import React, { useEffect } from 'react';
import { Contact } from './Contact';
import { SearchUser } from '../'
import { subForUserChats } from '../../api'
import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getContacts, removeContact } from '../../store/contacts'
import List from '@material-ui/core/List';
import { onSnapshot } from 'firebase/firestore';

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
    dispatch(removeContact(contact));
    navigate('/#');
  }

  const getMessageColor = (id) => {
    return (contactId === id) ?
      '#00808066' :
      'inherit';
  }

  const getLastMessage = (id, key) => {
    return messageList[id]?.[-1]?.[key]
  }

  useEffect(() => {
    // onSnapshot()
    // dispatch(getContacts())
  }, [dispatch, contactList]);

  return (
    <List className={classes.root}>
      <SearchUser />
      {pendingGet && <h3>{pendingGet}</h3>}
      {errorGet && <h3>{errorGet.message}</h3>}
      {(!pendingGet || !errorGet) &&
        Object.entries(contactList).map((item) =>
          <Link to={`/chat/${item.uid}`}
            key={item.uid}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Contact
              key={item.uid}
              callBack={deleteContact}
              contactId={item.uid}
              author={item.displayName || item.email}
              // text={getLastMessage(item[0], 'text')}
              // date={getLastMessage(item[0], 'date')}
              color={getMessageColor(item.uid)}
            />
          </Link >
        )
      }
    </List >
  );
}

// uid:"pIQJ75w6xNhrNLhmjNCROwLInnq1"
// email:"as@as.com"
// phoneNumber:"+89012345678"
// displayName:"Sergio"