import { Contact } from './Contact';
import { React } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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

  const classes = useStyles();

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
              selected={contact === item[1]}
              author={item[1]}
              text={
                messageList[item[0]][messageList[item[0]].length - 1]?.text
              }
              date={
                messageList[item[0]][messageList[item[0]].length - 1]?.date
              }
              color={item?.color}
            />
          </Link >
        )
      }
    </List >
  );
}
