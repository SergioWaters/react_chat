import React from 'react';
import styles from './index.module.css';
import { Message } from '../../components';
import { Button, TextField } from '@material-ui/core'

export class ClassChat extends React.Component {
  state = {
    author: '',
    text: '',
    id: (new Date() * Math.random()).toString(),
    messageList: [],
    chatBot: {
      author: "Vlad-bot",
      text: "Have no fear, Vlad is here!",
      id: (new Date() * Math.random()).toString(),
    }
  };
  updateMessage = (event) => {
    this.setState({
      text: event.target.value,
    });
  };
  updateAuthor = (event) => {
    this.setState({
      author: event.target.value,
    });
  };
  updateMessageList = (event) => {
    const { id, author, text, messageList } = this.state;
    const message = { author, text, id };
    this.setState({
      messageList: ([...messageList, message]),
    })
    event.preventDefault()
  }

  componentDidUpdate() {
    const messageList = this.state.messageList;
    const lastMessage = messageList[messageList.length - 1];
    let timerId = null;

    if (messageList.length && lastMessage?.author !== "Vlad-bot") {
      timerId = setTimeout(() => {
        this.setState({
          messageList: ([...messageList, this.state.chatBot]),
        })
      }, 1500);
    }
    clearInterval(timerId);
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <h3>Class Chat Component</h3>
        <span>{this.state.messageList.length} messages total</span>
        <div className={styles.messageList}>
          {
            this.state.messageList.map((message) =>
              <Message
                key={message.id}
                author={message.author}
                text={message.text}
                date={(new Date()).toString()}
              />
            )
          }
        </div>
        <div className={styles.messageForm}>

          <TextField
            id="standard-required"
            label="Name yourself"
            onChange={(e) => this.updateAuthor(e.target.value)}
          />


          <TextField
            onChange={(e) => this.updateMessage(e.target.value)}
            id="standard-textarea"
            label="Put your message here"
            multiline
          />

          <Button
            variant="contained"
            color="primary"
            onClick={this.updateMessageList}>
            Send
          </Button>
        </div>
      </div>
    );
  }
}
