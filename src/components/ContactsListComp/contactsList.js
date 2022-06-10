import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {
  Link,
  // useParams
} from "react-router-dom";
import { chatsArr } from '../../resourses/chats.js'
import { Contact } from './Contact'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


export const ChatList = () => {
  const [chats] = useState(chatsArr)
  const classes = useStyles();
  // const { contact } = useParams();

  return (
    <List className={classes.root}>
      {
        chats.map((item) =>
          <Link to={`/chat/${item.id}`}
            key={item.id}
            style={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <Contact
              author={item.author}
              text={item.messageList[item.messageList.length - 1].text}
              date={item.messageList[item.messageList.length - 1].date}
              color={item.color}
            />
          </Link >
        )
      }

    </List >
  );
}
