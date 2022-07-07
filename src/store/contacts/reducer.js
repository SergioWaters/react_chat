import {
  ADD_CHAT,
  DELETE_CHAT,
} from "./types";
import { chatsArr } from '../../resourses/chats.js';

const initialState = {
  contactList: Object.assign({}, ...chatsArr.map(chat => {
    return { [String(chat.id)]: chat.author }
  }))
};

export const contactsReducer = (state = initialState, action) => {
  const payload = action.payload
  switch (action.type) {
    case ADD_CHAT:
      return {
        ...state,
        contactList: {
          [payload.id]: payload.author,
          ...state.contactList
        },
      }
    case DELETE_CHAT:
      return delete state.contactList[payload.id];
    default:
      return state;
  }
};