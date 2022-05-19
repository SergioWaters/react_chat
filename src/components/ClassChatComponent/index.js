import React from 'react';
import styles from './index.module.css';
import Message from '../MessageComponent';


export class Messages extends React.Component {
  state = {
    message: { author: 'Your Name', text: "Your message", date: new Date() },
    messageList: [],
    BotMessage: 'Hello'
  };
  updateMessage = (event) => {
    this.setState({
      message: { text: event.target.value },
    });
  };
  updateAuthor = (event) => {
    this.setState({
      message: { author: event.target.value },
    });
  };
  updateMessageList = (event) => {
    const { message, messageList } = this.state;
    const newMessageList = messageList;
    newMessageList.push(message);
    this.setState({
      message: {
        author: 'Your Name',
        text: "Your message",
      },
      messageList: newMessageList,
    })
    event.preventDefault()
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <h1>ClassChatComponent</h1>
        <div className={styles.messageList}>
          {
            this.state.messageList.map((message) =>
              <Message
                key={(new Date() * Math.random()).toString()}
                author={message.author}
                text={message.text}
                date={(new Date()).toString()} />
            )
          }
        </div>
        <div className={styles.messageForm}>
          <input
            onChange={this.updateAuthor}
            defaultValue={this.state.message.author} />
          <textarea
            onChange={this.updateMessage}
            defaultValue={this.state.message.text} />
          <button className="messages-button"
            onClick={this.updateMessageList}>
            Send
          </button>
        </div>
      </div>
    );
  }
}
