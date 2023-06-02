import { Link } from "react-router-dom";
import styles from './index.module.css';
import { Navigate } from "react-router-dom";
import { List, ListItem } from '@material-ui/core';

export const HomePage = ({ isAuth }) => {

  return (isAuth ?
    <Navigate to="/chat" /> :
    (
      <div className={styles.wrapper}>
        <h1>Hello!</h1>
        <List>
          <ListItem style={{ color: 'inherit', display: 'flex', flexDirection: 'column' }}>
            <p>Allready have an account?</p>
            <Link
              to="/login">LOG IN</Link>
          </ListItem>
          <ListItem style={{ color: 'inherit', display: 'flex', flexDirection: 'column' }}>
            <p>Do not have an account yet?</p>
            <Link
              to="/signup">SIGN UP</Link>
          </ListItem>
        </List>
      </div >
    )
  )
}