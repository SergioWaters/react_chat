import styles from "./msg.module.css"

function App(props) {
  return (
    <div className={styles.App}>
      <h3 className={styles.Msg}>{props.msg}</h3>
    </div>
  );
}

export default App;