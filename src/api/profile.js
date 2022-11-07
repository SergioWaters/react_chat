import {
  doc, getDoc,
  setDoc, deleteDoc, updateDoc
} from 'firebase/firestore';
import { firestore } from "./firebase";

export const createProfileApi = (user) => {
  if (!user) user = {};
  return setDoc(doc(firestore, 'users', user.uid), user);
};

export const getProfileApi = (uid) => {
  return getDoc(doc(firestore, 'users', uid));
};

export const removeProfileApi = (uid) => {
  return deleteDoc(doc(firestore, 'users', uid));
};

export const updateProfileApi = (updateData) => {
  return updateDoc(doc(firestore, 'users', updateData.uid), updateData);
};
