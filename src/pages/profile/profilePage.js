import {
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, toggleVisibleProfile } from "../../store/profile";
import styles from './index.module.css';

export const ProfilePage = () => {

  const { profile } = useSelector((state) => state)

  const [form, setForm] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    radio: profile.radio,
  });

  // const [isVisProfile] = useState(profile.isVisibleProfile)

  const dispatch = useDispatch();

  const handleChangeForm = (event) => {
    const field = event.target.getAttribute("data-name");
    if (!!field) {
      setForm({
        ...form,
        [field]: event.target.value,
      });
    }
  };


  return (
    <div className={styles.wrapper}>

      <h1>Edit profile</h1>

      <TextField className={styles.input}
        // inputRef={inputRef}
        onChange={handleChangeForm}
        id="standard-textarea"
        label="Put your name"
        value={form.firstName}
        inputProps={{
          "data-name": "firstName",
        }}
      />

      <TextField className={styles.input}
        onChange={handleChangeForm}
        id="standard-textarea"
        label="Put your last name"
        value={form.lastName}
        inputProps={{
          "data-name": "lastName",
        }}
      />

      <FormControl>

        <RadioGroup row
          value={form.radio}
          onChange={handleChangeForm}

        >
          <FormControlLabel
            label="Male"
            value='male'
            control={
              <Radio
                color="primary"
                inputProps={{
                  "data-name": "radio",
                }}
              />}
          />
          <FormControlLabel
            label="Female"
            value='female'
            control={
              <Radio
                color="primary"
                inputProps={{
                  "data-name": "radio",
                }}
              />}
          />
        </RadioGroup>
      </FormControl>

      <FormControlLabel
        label="Checkbox"
        control={
          <Checkbox
            onChange={() => dispatch(toggleVisibleProfile())}
            checked={profile.isVisibleProfile}
            color="primary"
            inputProps={{
              "data-name": "isVisibleProfile",
            }}
          />
        } />

      <Button
        onClick={() => dispatch(updateProfile(form))}
        variant="contained"
        color="primary">save</Button>
    </div >
  );
};