import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { chatsArr } from './resourses/chats'
import {
  Layout,
  FirstComp,
  FuncChatComp,
  ClassChat,
  Header,
  ChatList
} from './components'
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
// import { AppBar } from "@material-ui/core"

const chatTheme = createTheme({
  palette: {
    primary: {
      main: "#008080",
    },
    secondary: {
      main: "#f8f8f8",
    },
  },
});

const chatList = [...chatsArr]

const root = ReactDOM.createRoot(document.getElementById('root'));
const someName = 'Sergio'
root.render(
  <React.StrictMode>
    <ThemeProvider theme={chatTheme}>
      <Layout
        header={<Header />}
        chats={<ChatList list={chatList} />}
        ClassMessages={<ClassChat />}
        FuncMessages={<FuncChatComp />}
      />
      <FirstComp name={someName} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();