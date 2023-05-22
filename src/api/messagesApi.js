import {
  arrayUnion,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  getDoc,
  serverTimestamp,
  deleteField,
  remove,
  get,
} from "firebase/firestore";
import { firestore } from "./firebase";
import { auth } from "./firebase";

const getCurrentUser = () => auth.currentUser;

export const createMessageApi = (mess, chatId) => {
  const chatRef = doc(firestore, "chats", chatId);
  console.log(mess, chatId, chatRef);

  return setDoc(
    chatRef,
    {
      messages: arrayUnion(mess),
    },
    { merge: true }
  );
};

export const removeMessageApi = ({ authorId, messageId }) => {
  // return remove(child(ref(firestore), `messages/${authorId}/${messageId}`));
};

export const removeAllMessagesApi = (authorId) => {
  // return remove(child(ref(firestore), `messages/${authorId}`));
};

export const getMessagesApi = (key) => {
  return getDoc(firestore, "chats", key);
};

// @TODO: разобраться с автообновлением
export const onMessagesAddedApi = (key, cb) => {
  return onSnapshot(doc(firestore, "chats", key), cb);
};

export const onMessagesChangedApi = () => {
  // return onChildChanged(child(ref(firestore), "messages/"));
};
