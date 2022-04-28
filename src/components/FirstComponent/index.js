import logo from './loading.gif';
import styles from './first.module.css';
import Message from "../Message"

const msg = "Hello World!"
function App(props) {
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <img src={logo} className={styles.AppLogo} alt="logo" />


        <Message msg={msg} />
        <h3>From {props.name}</h3>
      </header>
    </div>
  );
}

export default App;
