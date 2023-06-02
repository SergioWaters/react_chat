import React, { useEffect } from 'react';
import { Contact } from './Contact';
import { SearchUser } from '../'
import { makeStyles } from '@material-ui/core/styles';
import {
  Link, useParams,
} from "react-router-dom";
import {
  useSelector,
  useDispatch
} from "react-redux";
import {
  getContactsSuccess,
  deleteContact
} from '../../store/contacts'
import List from '@material-ui/core/List';
import { subForUserChatsApi } from '../../api';

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
  const dispatch = useDispatch()
  const { contactId } = useParams();
  const classes = useStyles();
  const { profile } = useSelector((s) => s.profile)
  const {
    contactList,
    pendingGet,
    errorGet } = useSelector((store) => store.contacts);

  const removeContact = (contact) => {
    dispatch(deleteContact(contact))
  }

  const getContactColor = (id) => {
    return (contactId === id) ?
      '#00808066' :
      'inherit';
  }

  useEffect(() => {
    const subChats = () => {
      const handle = (d) => dispatch(getContactsSuccess(d.data()))
      subForUserChatsApi(handle)
    };

    profile.uid && subChats()

  }, [dispatch, profile.uid]);

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
              key={item[0].uid}
              callBack={() => removeContact(item[0])}
              contactId={item[0]}
              author={item[1].displayName || item[1].email}
              // text={getLastMessage(item[0], 'text')}
              // date={getLastMessage(item[0], 'date')}
              color={getContactColor(item[0])}
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