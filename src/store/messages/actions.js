import { ADD_MSG, DELETE_MSG } from "./types";

export const addMsg = (msg) => {
  return { type: ADD_MSG, payload: msg };
};
export const deleteMsg = (msg) => {
  return { type: DELETE_MSG, payload: msg };
};