import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from './store';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { RoutesComp, Header } from './components'
import './index.css';

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
const App = () => {
  const [session, setSession] = useState(null);
  const isAuth = !!session;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession(user);
      } else {
        setSession(null);
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={chatTheme}>
          <BrowserRouter>
            <Header session={session} />
            <RoutesComp isAuth={isAuth} />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider >
  )
}
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();