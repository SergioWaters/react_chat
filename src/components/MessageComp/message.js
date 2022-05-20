import styles from "./index.module.css"

export const Message = (props) => {
  return (
    <div className={styles.message}>
      <h3 className={styles.author}>{props.author}</h3>
      <p className={styles.text}>{props.text}</p>
      <p className={styles.date}>{props.date}</p>
    </div>
  );
}