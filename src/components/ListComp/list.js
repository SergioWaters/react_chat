import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { randomColor } from 'randomcolor'

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


export const ChatList = (props) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {
        props.list.map((item) =>
          <div key={item.id}>
            <ListItem alignItems="flex-start" >
              <ListItemAvatar>
                <Avatar style={{
                  backgroundColor: randomColor()
                }}>{item.author[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.author}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {item.text}...
                    </Typography>
                    <h6>{item.date}</h6>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        )
      }

    </List >
  );
}
