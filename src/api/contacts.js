import {
  doc, getDocs, collection,
  setDoc, deleteDoc
} from 'firebase/firestore';
import { firestore } from "./firebase";

export const createContactApi = (contact) => {
  if (!contact) contact = {};
  return setDoc(doc(firestore, 'userChats', contact.uid), contact);
};

export const getContactsApi = () => {
  return getDocs(collection(firestore, "userChats"));
};

export const removeContactApi = (id) => {
  return deleteDoc(doc(firestore, 'contacts', id));
};