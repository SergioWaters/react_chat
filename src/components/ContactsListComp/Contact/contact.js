import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


export const Contact = (props) => {
  return (
    <>
      < ListItem
        alignItems="flex-start">
        <ListItemAvatar>
          <Avatar style={{
            backgroundColor: props?.color
          }}>{props.author[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={props.author}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {props.text}...
              </Typography>
              <Typography
              >
                {props.date}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem >
      <Divider variant="inset" component="li" />
    </>
  )
}