import {
  doc,
  updateDoc,
  setDoc,
  onSnapshot,
  getDoc,
  serverTimestamp,
  deleteField,
} from "firebase/firestore";
import { firestore } from "./firebase";
import { auth } from "./firebase";

const getCurrentUser = () => auth.currentUser;

export const createProfileContacts = (uid) => {
  return setDoc(doc(firestore, "userChats", uid), {});
};

export const updateProfileContacts = (chatId, userId, contact) => {
  // firebase / userChats / user.uid / chatId /{ ...contact, date: date }
  return updateDoc(doc(firestore, "userChats", userId), {
    [chatId]: {
      uid: contact.uid,
      email: contact.email,
      displayName: contact.displayName || null,
      photoUrl: contact?.photoUrl || null,
      date: serverTimestamp(),
    },
  });
};

export const getContactsApi = () => {
  const currentUser = getCurrentUser();
  return getDoc(doc(firestore, "userChats", currentUser.uid));
};

export const subForUserChatsApi = (cb) => {
  const currentUser = getCurrentUser();
  onSnapshot(doc(firestore, "userChats", currentUser.uid), cb);
};

export const removeContactApi = (chatId) => {
  const currentUser = getCurrentUser();
  return updateDoc(doc(firestore, "userChats", currentUser.uid), {
    [chatId]: deleteField(),
  });
};

export const createContactApi = async (contact) => {
  const currentUser = getCurrentUser();

  const chatId =
    contact.uid > currentUser.uid
      ? currentUser.uid + contact.uid
      : contact.uid + currentUser.uid;

  const chat = await getDoc(doc(firestore, "chats", chatId));
  const cont = await getDoc(doc(firestore, "userChats", contact.uid));
  const curr = await getDoc(doc(firestore, "userChats", currentUser.uid));

  if (!chat.exists()) {
    await setDoc(doc(firestore, "chats", chatId), { messages: [] });
  }

  try {
    if (!cont.exists()) {
      await createProfileContacts(contact.uid);
    }
    await updateProfileContacts(chatId, contact.uid, currentUser);
  } catch (error) {
    console.log(contact.displayName, error);
  }

  try {
    if (!curr.exists()) {
      await createProfileContacts(currentUser.uid);
    }
    await updateProfileContacts(chatId, currentUser.uid, contact);
  } catch (error) {
    console.log(currentUser.displayName, error);
  }
};
