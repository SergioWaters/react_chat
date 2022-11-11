import {
  doc, getDoc,
  setDoc, deleteDoc, updateDoc
} from 'firebase/firestore';
import { firestore } from "./firebase";

export const createProfileContacts = (uid) => {
  return setDoc(doc(firestore, "userChats", uid), {});
}

export const createProfileApi = (user) => {
  return setDoc(doc(firestore, 'users', user.uid), user);
};

export const getProfileApi = (uid) => {
  console.log(uid, '---from getprofapi')
  return getDoc(doc(firestore, 'users', uid));
};

export const removeProfileApi = (uid) => {
  return deleteDoc(doc(firestore, 'users', uid));
};

export const updateProfileApi = (updateData) => {
  return updateDoc(doc(firestore, 'users', updateData.uid), updateData);
};
