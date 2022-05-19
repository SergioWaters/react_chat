import styles from "./msg.module.css"

function App(props) {
  return (
    <div className={styles.App}>
      <h3 className={styles.Msg}>{props.msg}</h3>
    </div>
  );
}

export default App;







// return (
//   <div>
//     <h1>MessageList</h1>
//     <input
//       ref={ref}
//       placeholder="enter message ..."
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//     />
//     <button onClick={sendMessage}>send</button>

//     <hr />

//     {messages.map((message) => (
//       <div>
//         <h2>{message.author}</h2>
//         <h2>{message.message}</h2>
//         <hr />
//       </div>
//     ))}
//   </div>
// );
// };