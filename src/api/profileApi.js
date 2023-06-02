import {
  doc, getDoc, query, getDocs,
  collection,
  where,
  setDoc, deleteDoc, updateDoc
} from 'firebase/firestore';
import { firestore } from "./firebase";

export const createProfileApi = (user) => {
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

export const searchUserApi = async (searchLine) => {
  const que = query(
    collection(firestore, 'users'),
    where('displayName', '==', searchLine)
  )
  return getDocs(que)
};
