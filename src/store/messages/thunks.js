import { addMsg } from "./actions";

export const addMsgMidWare = (message) => (dispatch, getState) => {
  dispatch(addMsg(message));

  let timerId = null;
  if (message.contactId === "bot") {
    timerId = setTimeout(() => {
      dispatch(
        addMsg({
          contactId: message.contactId,
          author: "Vlad-bot",
          text: "Have no fear, Vlad is here!",
        })
      );
    }, 1500);
  }
  return () => {
    clearInterval(timerId);
  };
};