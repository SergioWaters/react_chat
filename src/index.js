import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
// import Messages from './components/ClassChatComp/classChat'
// import FirstComponent from './components/FirstComp/firstComp'
// import FuncChatComponent from './components/FuncChatComp/funcChat'
import { Layout, Message, FirstComp, FuncChatComponent, ClassChat } from './components'

import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const chatTheme = createTheme({
  palette: {
    primary: {
      main: "#fdfdfd",
    },
    secondary: {
      main: "#f8f8f8",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
const someName = 'Sergio'
root.render(
  <React.StrictMode>
    <ThemeProvider theme={chatTheme}>
      <div className='chatWrapper'>
        <ClassChat />
        <FuncChatComponent />
      </div>
      <Layout
        header={<Message />}
        chats={<Message />}
        messages={<Message />} />
      <FirstComp name={someName} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();