import { useState } from "react";
import {
  Button,
  TextField,
} from "@material-ui/core";
import styles from './index.module.css';

export const FormComp = ({ elementsArr, onSubmit }) => {
  const [form, setForm] = useState({});

  const handleChangeForm = (e) => {
    const field = e.target.getAttribute("data-name");
    const value = e.target.value
    if (!!field) {
      setForm({
        ...form,
        [field]: value,
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      {elementsArr.map(i => {
        return (
          <TextField
            helperText={i.label}
            key={i.attr}
            style={{ margin: 5 }}
            label={i.value || i.label}
            value={i.value}
            inputProps={{
              'data-name': i.attr
            }}
            onChange={handleChangeForm}
          />
        )
      })}
      <Button
        style={{ margin: 10 }}
        variant="contained"
        color="primary"
        onClick={() => onSubmit(form)}>
        Submit
      </Button>

    </div>
  );
};