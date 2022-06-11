import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfilePage, ChatPage } from "./pages";
import { FirstComp, Header } from './components'
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

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

const root = ReactDOM.createRoot(document.getElementById('root'));
const someName = 'This Page Does not Exist'
root.render(
  <React.StrictMode>
    <ThemeProvider theme={chatTheme}>
      <BrowserRouter>

        <Header />

        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chat/*" element={<ChatPage />} />
          <Route exact path="/" element={<ProfilePage />} />
          <Route path="*" element={<FirstComp name={someName} />} />
        </Routes>

      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();