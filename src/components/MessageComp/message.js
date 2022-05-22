import styles from "./index.module.css"
import { Card } from '@material-ui/core'

export const Message = (props) => {
  return (
    <>
      <Card className={styles.message}>
        <h5 className={styles.author}>{props.author}</h5>
        <p className={styles.text}>{props.text}</p>
        <p className={styles.date}>{props.date}</p>
      </Card>
    </>
  );
}