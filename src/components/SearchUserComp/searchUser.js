import React, { useState, useRef } from 'react'
import { TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { searchUserApi } from '../../api'
import { createContact } from '../../store/contacts';

export const SearchUser = () => {
  const dispatch = useDispatch()
  const searchInputRef = useRef();
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const handleChange = async () => {
    const searchLine = searchInputRef.current.value;
    setError("Searching");
    await searchUserApi(searchLine)
      .then((r) => r.forEach(i => {
        setResult(i.data())
        setError('')
      }))
  };
  const addContact = () => {
    dispatch(createContact(result))
  };

  return (
    <>
      <TextField
        inputRef={searchInputRef}
        style={{ margin: 5 }}
        label="find new contacts"
        onChange={handleChange}
      />
      {error && <div className='results'>{error}</div>}
      {result && <div className='results' onClick={addContact}>{result?.email}</div>}
    </>
  )
}
