import {
  doc, getDocs, collection, where, updateDoc,
  setDoc, deleteDoc, onSnapshot, query, getDoc,
  serverTimestamp
} from 'firebase/firestore';
import { firestore } from "./firebase";
import { auth } from './firebase'

const uid = () => auth.currentUser.uid;

export const createContactApi = async (result) => {

  const chatId = (result.uid > uid()) ?
    auth.uid + result.uid :
    result.uid + auth.uid

  const chat = await getDoc(doc(firestore, 'chats', chatId))

  if (!chat.exists()) {
    await setDoc(doc(firestore, 'chats', chatId), { messages: [] });

    await updateDoc(doc(firestore, 'userChats', uid()), {
      [chatId + '.userInfo']: {
        uid: result.uid,
        email: result.email,
        displayName: result?.displayName,
        photoUrl: result?.photoUrl
      },
      [chatId + '.date']: serverTimestamp()
    });

    await updateDoc(doc(firestore, 'userChats', result.uid), {
      [chatId + '.userInfo']: {
        uid: auth.uid,
        email: auth.email,
        displayName: auth?.displayName,
        photoUrl: auth?.photoUrl,
      },
      [chatId + '.date']: serverTimestamp()
    },
    )
  }
};

export const getContactsApi = (chatId) => {
  return chatId ?
    getDocs(collection(firestore, "userChats" + uid(), chatId)) :
    getDocs(collection(firestore, "userChats", uid()))
};

export const subForUserChatsApi = (chatId) => {
  return onSnapshot(doc(firestore, 'userChats', chatId || uid()), (data) => {
    console.log('subForUserChats --- ', data, data.data())
    return data.data()
  })
}

export const removeContactApi = (chatId) => {
  return deleteDoc(doc(firestore, 'userChats' + uid(), chatId));
};

export const searchUserApi = async (searchLine) => {
  const que = query(
    collection(firestore, 'users'),
    where('email', '==', searchLine)
  )
  return getDocs(que)
};
