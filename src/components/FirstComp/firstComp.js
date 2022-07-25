import logo from './loading.gif';
import styles from './index.module.css';
import Greetings from "./GreetingsComp/greetings"

const msg = "Hello World!"
export const FirstComp = (props) => {
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <img src={logo} className={styles.AppLogo} alt="logo" />


        <Greetings msg={msg} />
        <h3> {props.name}</h3>
      </header>
    </div>
  );
}