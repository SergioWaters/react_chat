import {
  ADD_MSG,
  DELETE_MSG,
} from "./types";
import { chatsArr } from '../../resourses/chats.js';

const initialState = {
  messageList: Object.assign({}, ...chatsArr.map(chat => {
    return { [chat.id]: chat.messageList }
  })),
};

const getMsg = (p) => {
  return {
    author: p?.author,
    text: p?.text,
    date: p?.date,
    id: p?.id,
  }
}

export const messagesReducer = (state = initialState, action) => {
  const payload = action.payload
  switch (action.type) {
    case ADD_MSG:
      return {
        ...state,
        messageList: {
          ...state.messageList,
          [payload.contactId]: [
            ...state.messageList[payload.contactId], getMsg(payload)
          ]
        },
      }
    case DELETE_MSG:
      return delete state.messageList[payload];
    default:
      return state;
  }
};