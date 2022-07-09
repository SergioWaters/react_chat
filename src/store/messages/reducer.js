import {
  ADD_MSG,
  DELETE_MSG,
} from "./types";
import { DELETE_CHAT } from "../contacts";
import { chatsArr } from '../../resourses/chats.js';
import { getDate, getId } from '../../resourses/helpers.js'

const initialState = {
  messageList: Object.assign({}, ...chatsArr.map(chat => {
    return { [chat.id]: chat.messageList }
  })),
};

const getMsg = (p) => {
  return {
    author: p?.author,
    text: p?.text,
    date: p.date || getDate(),
    id: p.id || getId(),
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
            ...(state.messageList[payload.contactId] || []), getMsg(payload)
          ]
        },
      };
    case DELETE_MSG:
      return {
        ...state,
        messageList: {
          ...state.messageList,
          [payload.contactId]: state.messageList[payload.contactId].filter((mess) => mess.id !== payload.messId)
        },
      };
    case DELETE_CHAT:
      delete state.messageList[payload.contactId];
      return state;
    default:
      return state;
  }
};