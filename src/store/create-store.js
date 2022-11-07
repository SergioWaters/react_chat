import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';
import { getPublicGistsApi, getGistsByNameApi } from "../api/gists";
import {
  getContactsApi,
  createContactApi,
  removeContactApi
} from '../api/contacts';
import {
  getMessagesApi,
  createMessageApi,
  removeMessageApi,
  removeAllMessagesApi
} from '../api/messages';
import {
  getProfileApi,
  updateProfileApi,
  removeProfileApi,
  createProfileApi
} from '../api/profile';
import { profileReducer } from "./profile";
import { contactsReducer } from "./contacts";
import { messagesReducer } from "./messages";
import { gistsReducer } from "./gists";
import createSagaMiddleware from 'redux-saga';

const persistConfig = {
  key: "root",
  storage,
  blacklist: ['contacts', 'messages']
};

const rootReducer = combineReducers({
  profile: profileReducer,
  contacts: contactsReducer,
  messages: messagesReducer,
  gists: gistsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const api = {
  getPublicGistsApi,
  getGistsByNameApi,
  getContactsApi,
  createContactApi,
  removeContactApi,
  getMessagesApi,
  createMessageApi,
  removeMessageApi,
  removeAllMessagesApi,
  updateProfileApi,
  getProfileApi,
  removeProfileApi,
  createProfileApi
};

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument(api), sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (args) => args
  )
);
export const persistor = persistStore(store);