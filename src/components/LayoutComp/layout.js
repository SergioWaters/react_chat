import styles from "./index.module.css";
// import { Container } from "@material-ui/core";

export const Layout = ({ chats, ClassMessages, FuncMessages, header }) => {
  return (
    // <Container className={styles.body}>
    <div className={styles.wrapper}>
      <div className={styles.header}>{header}</div>
      <div className={styles.content}>
        <div className={styles.chats}>{chats}</div>
        <div className={styles.messages}>{ClassMessages}</div>
        <div className={styles.messages}>{FuncMessages}</div>
      </div>
    </div>
    // </Container>
  );
};