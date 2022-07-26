import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfilePage, ChatPage, GistsList, AxiosGists } from "./pages";
import { FirstComp, Header } from './components'
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Provider } from 'react-redux';
import { store, persistor } from './store';

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
const someMessage = 'This Page Does not Exist'
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={chatTheme}>
          <BrowserRouter>

            <Header />

            <Routes>
              <Route path="/gists" element={<GistsList />} />
              <Route path="/axios" element={<AxiosGists />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/chat/*" element={<ChatPage />} />
              <Route exact path="/" element={<ProfilePage />} />
              <Route path="*" element={<FirstComp name={someMessage} />} />
            </Routes>

          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();