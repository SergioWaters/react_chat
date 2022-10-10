import { React } from 'react';
import { Contact } from './Contact';
import { deleteChat } from '../../store/contacts';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { allMessagesSelector } from "../../store/messages";
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

  const dispatch = useDispatch()
  const { contactId } = useParams();
  const messageList = useSelector(allMessagesSelector());
  const { contactList } = useSelector((store) => store.contacts);
  const classes = useStyles();

  const handler = (id) => {
    dispatch(deleteChat({ contactId: id }))
  }

  const getMessageColor = (id) => {
    if (contactId === id) return '#00808066';
    else return 'inherit';
  }

  const getLastMessage = (id, key) => {
    return messageList[id]?.[messageList[id].length - 1]?.[key]
  }

  return (
    <List className={classes.root}>
      {
        Object.entries(contactList).map((item) =>
          <Link to={`/chat/${item[0]}`}
            key={item[0]}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Contact
              callBack={handler}
              author={item[1]}
              contactId={item[0]}
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
