import { Contact } from './Contact';
import { React, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export const ChatList = ({ chatsArr }) => {

  const { contact } = useParams();
  const { messageList } = useSelector((store) => store.messages);
  const { contactList } = useSelector((store) => store.contacts);

  const [state, setState] = useState({
    contactList,
    messageList
  });
  const classes = useStyles();
  useEffect(() => setState(state), [state, contact]);


  return (
    <List className={classes.root}>
      {
        Object.entries(state.contactList).map((item) =>
          <Link to={`/chat/${item[0]}`}
            key={item[0]}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Contact
              selected={contact === item[1]}
              author={item[1]}
              text={
                state.messageList[item[0]][state.messageList[item[0]].length - 1].text
              }
              date={
                state.messageList[item[0]][state.messageList[item[0]].length - 1].date
              }
              color={item?.color}
            />
          </Link >
        )
      }
    </List >
  );
}
