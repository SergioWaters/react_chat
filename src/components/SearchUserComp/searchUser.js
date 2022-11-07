import React, { useState, useRef } from 'react'
import { auth, firestore } from "../../api/firebase";
import { TextField } from "@material-ui/core";
import {
  collection, query, where, getDocs, getDoc, doc,
  setDoc, updateDoc, serverTimestamp
} from 'firebase/firestore';

export const SearchUser = () => {
  const searchInputRef = useRef();
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const handleChange = async () => {
    const searchLine = searchInputRef.current.value;
    setError("Here will be the results");

    const que = query(
      collection(firestore, 'users'),
      where('email', '==', searchLine)
    )

    try {
      const contactsArr = await getDocs(que)
      contactsArr.forEach(c => setResult(c.data()))

    } catch (error) {
      setError(error.message);
      return
    }
    setError('')
  };

  const addContact = async () => {

    const chatId = (result.uid > auth.uid) ?
      auth.uid + result.uid : result.uid + auth.uid

    try {
      const chat = await getDoc(doc(firestore, 'chats', chatId))

      if (!chat.exists()) {
        await setDoc(doc(firestore, 'chats', chatId), { messages: [] });

        await updateDoc(doc(firestore, 'userChats', auth.uid), {
          [chatId + ".userInfo"]: {
            uid: auth.uid,
            displayName: auth?.displayName,
            photoUrl: auth?.photoUrl
          },
          [chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(firestore, 'userChats', result.uid), {
          [chatId + ".userInfo"]: {
            uid: result.uid,
            displayName: result?.displayName,
            photoUrl: result?.photoUrl
          },
          [chatId + ".date"]: serverTimestamp(),
        })
      }

    } catch (e) {
      setError(e.message)
    };

    setResult('');
    searchInputRef.current.value = '';
  }

  return (
    <>
      <TextField
        inputRef={searchInputRef}
        style={{ margin: 5 }}
        label="find new contacts"
        onChange={handleChange}
      />
      {error && <div className='results'>{error}</div>}
      {result && <div className='results' onClick={addContact}>{result.email}</div>}
    </>
  )
}