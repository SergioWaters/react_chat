import React from 'react';
import styles from './index.module.css';
import { Message } from '../../components';


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
    const message = {
      author: author,
      text: text,
      id: id
    }
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

    return () => {
      clearInterval(timerId);
    };
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <h1>Class Chat Component</h1>
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
          <input className={styles.messageAuthor}
            onChange={this.updateAuthor}
            placeholder="Name yourself" />

          <textarea className={styles.messageText}
            onChange={this.updateMessage}
            placeholder="put your message here" />

          <button className={styles.messageButton}
            onClick={this.updateMessageList}>
            Send
          </button>
        </div>
      </div>
    );
  }
}
