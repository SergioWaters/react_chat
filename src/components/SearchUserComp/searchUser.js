import React, { useState, useRef, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { searchUserApi } from "../../api";
import { createContact } from "../../store/contacts";

export const SearchUser = () => {
  const { errorCreate } = useSelector((s) => s.contacts);
  const dispatch = useDispatch();
  const [searchLine, setSearchLine] = useState("");
  const [error, setError] = useState(errorCreate);
  const [resultsArr, setResult] = useState([]);

  const handleChange = async (e) => {
    setSearchLine(e.target.value);
    setError("Searching");
    setResult([]);
    const newArr = [];
    try {
      await searchUserApi(searchLine).then((r) => {
        r.forEach((i) => {
          newArr.push(i.data());
          setResult(newArr);
        });
      });
      if (!newArr.length) setError("Nothing found");
    } catch (e) {
      setError(e.message);
    }
  };

  const addContact = (e) => {
    const found = JSON.parse(e.target.innerText);
    dispatch(createContact(found));
    setError("");
    setResult([]);
    setSearchLine("");
  };

  useEffect(() => {
    setError(errorCreate);
  }, [errorCreate]);

  return (
    <>
      <TextField
        style={{ margin: 5 }}
        label="find new contacts"
        onChange={handleChange}
        value={searchLine}
      />
      {error && <div className="results">{error.code || error}</div>}

      {!!resultsArr.length &&
        resultsArr.map((i) => (
          <div key={i.uid} onClick={addContact}>
            {JSON.stringify(i)}
          </div>
        ))}
    </>
  );
};
