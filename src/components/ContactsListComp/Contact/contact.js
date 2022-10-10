import { React } from 'react';
import {
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Typography,
  Avatar
} from '@material-ui/core';

export const Contact = ({ author, text, date, callBack, contactId, color }) => {

  return (
    <>
      <ListItem
        style={{
          backgroundColor: color
        }}
        alignItems="flex-start">
        <ListItemAvatar>
          <Avatar style={{
            // backgroundColor: props?.color
          }}>{author[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText
          component="div"
          primary={author}
          secondary={
            <>
              {text}
              <Typography
                style={{
                  display: 'block'
                }}
                component="span"
                variant="body2"
              >
                {date}
              </Typography>
            </>
          }
        />
        <span style={{ position: 'absolute', top: '0px', right: "3px", padding: '6px' }}
          onClick={() => callBack(contactId)}>x</span>
      </ListItem >
      <Divider variant="inset" component="li" />
    </>
  )
}