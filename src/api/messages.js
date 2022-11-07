import {
  child,
  ref,
  get,
  remove,
  push,
  onChildChanged,
  onValue
} from "firebase/database";
import { database } from "./firebase";

export const createMessageApi = (mess) => {
  return push(child(ref(database), `messages/${mess.contactId}`), mess);
};

export const removeMessageApi = ({ authorId, messageId }) => {
  return remove(child(ref(database), `messages/${authorId}/${messageId}`));
};

export const removeAllMessagesApi = (authorId) => {
  return remove(child(ref(database), `messages/${authorId}`));
};

export const getMessagesApi = (key) => {
  return get(child(ref(database), `messages/${key}`));
};


// @TODO: разобраться с автообновлением 
export const onMessagesAddedApi = (key, cb) => {
  return onValue(ref(database, `messages/${key}`), (s) => cb(s));
};

export const onMessagesChangedApi = () => {
  return onChildChanged(child(ref(database), 'messages/'));
}