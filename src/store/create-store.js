import { createStore, combineReducers } from "redux";
import { profileReducer } from "./profile";
import { contactsReducer } from "./contacts";
import { messagesReducer } from "./messages";

export const store = createStore(
  combineReducers({
    profile: profileReducer,
    contacts: contactsReducer,
    messages: messagesReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (args) => args
);