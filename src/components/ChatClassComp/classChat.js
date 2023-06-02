import React from 'react';
import styles from './index.module.css';
import { Message } from '..';
import { Button, TextField } from '@material-ui/core'

export class ClassChat extends React.Component {
  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
  };
  state = {
    author: '',
    text: '',
    id: '',
    messageList: [],
  };
  getId() {
    const id = (new Date() * Math.random()).toString()
    return id
  }
  updateText = (event) => {
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
    event.preventDefault();
    let { id, author, text, messageList } = this.state;
    if (!author) author = "Anonimous";
    if (!text) return;
    id = this.getId();
    const message = { author, text, id };
    this.setState({
      messageList: ([...messageList, message]),
      text: '',
    })
  };

  onUpdate() {
    const messageList = this.state.messageList;
    const lastMessage = messageList[messageList.length - 1];
    let timerId = null;
    const chatBot = {
      author: "Vlad-bot",
      text: "Have no fear, Vlad is here!",
      id: this.getId(),
    }

    if (messageList.length && lastMessage?.author !== "Vlad-bot") {
      timerId = setTimeout(() => {
        this.setState({
          messageList: ([...messageList, chatBot]),
        })
      }, 1500);
    }
    return () => {
      clearInterval(timerId);
    };
  };

  componentDidUpdate() {
    this.onUpdate()
    this.scrollRef.current.scrollTo(0, this.scrollRef.current.scrollHeight);
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Class Chat Component <span>{this.state.messageList.length} messages total</span></h3>

        <div className={styles.messageList} ref={this.scrollRef}>
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
            onChange={(e) => this.updateAuthor(e)}
            value={this.state.author}
          />


          <TextField
            onChange={(e) => this.updateText(e)}
            id="standard-textarea"
            label="Put your message here"
            multiline
            value={this.state.text}
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
