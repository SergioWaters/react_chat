import {
  doc,
  updateDoc,
  setDoc,
  onSnapshot,
  getDoc,
  serverTimestamp,
  deleteField
} from 'firebase/firestore';
import { firestore } from "./firebase";
import { auth } from './firebase'

const getCurrentUser = () => auth.currentUser;


export const createMessageApi = (mess, chatId) => {
  const currentUser = getCurrentUser()
  return updateDoc(doc(firestore, 'chats', chatId), {})
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