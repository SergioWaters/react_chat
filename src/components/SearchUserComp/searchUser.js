import React, { useState, useRef, useEffect } from 'react'
import { TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { searchUserApi } from '../../api'
import { createContact } from '../../store/contacts';

export const SearchUser = () => {
  const { errorCreate } = useSelector((s) => s.contacts)
  const dispatch = useDispatch()
  const searchInputRef = useRef();
  const [error, setError] = useState(errorCreate);
  const [resultsArr, setResult] = useState([]);

  const handleChange = async () => {
    const searchLine = searchInputRef.current.value;
    setError("Searching");
    await searchUserApi(searchLine)
      .then((r) => r.forEach(i => {
        const newArr = resultsArr;
        newArr.push(i.data());
        setResult(newArr)
        setError('')
      }))
  };
  const addContact = (e) => {
    const found = JSON.parse(e.target.innerText)
    dispatch(createContact(found))
  };

  useEffect(() => {
    setError(errorCreate)
  }, [errorCreate])

  return (
    <>
      <TextField
        inputRef={searchInputRef}
        style={{ margin: 5 }}
        label="find new contacts"
        onChange={handleChange}
      />
      {error && <div className='results'>
        {error.code || error}
      </div>}

      {!!resultsArr.length &&
        resultsArr.map((i) =>
          <div key={i.uid} onClick={addContact}>
            {JSON.stringify(i)}
          </div>
        )}

    </>
  )
}
