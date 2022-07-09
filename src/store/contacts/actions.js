import { ADD_CHAT, DELETE_CHAT } from "./types";

export const addChat = (chat) => {
  return { type: ADD_CHAT, payload: chat };
};
export const deleteChat = (chat) => {
  return { type: DELETE_CHAT, payload: chat };
};