import styles from "./index.module.css"
import { Card } from '@material-ui/core'

export const Message = ({ author, text, date }) => {
  return (
    <>
      <Card className={styles.message}>
        <h5 className={styles.author}>{author}</h5>
        <p className={styles.text}>{text}</p>
        <p className={styles.date}>{date}</p>
      </Card>
    </>
  );
}