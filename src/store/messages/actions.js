import {
  GET_MESSAGES_START,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_ERROR,
  CREATE_MESSAGE_START,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_ERROR,
  REMOVE_MESSAGE_START,
  REMOVE_MESSAGE_ERROR,
  REMOVE_MESSAGE_SUCCESS,
  REMOVE_ALL_MESSAGES_START,
  REMOVE_ALL_MESSAGES_SUCCESS,
  REMOVE_ALL_MESSAGES_ERROR,
  UPDATE_MESSAGES_START,
  UPDATE_MESSAGES_SUCCESS,
  UPDATE_MESSAGES_ERROR,
} from "./types";

//get
export const getMessagesStart = () => ({
  type: GET_MESSAGES_START,
});
export const getMessagesSuccess = (messages) => ({
  type: GET_MESSAGES_SUCCESS,
  payload: messages,
});
export const getMessagesError = (error) => ({
  type: GET_MESSAGES_ERROR,
  payload: error,
});

//Create
export const createMessageStart = () => ({
  type: CREATE_MESSAGE_START,
});
export const createMessageSuccess = (message) => ({
  type: CREATE_MESSAGE_SUCCESS,
  payload: message,
});
export const createMessageError = (error) => ({
  type: CREATE_MESSAGE_ERROR,
  payload: error,
});

//Remove
export const removeMessageStart = () => ({
  type: REMOVE_MESSAGE_START,
});
export const removeMessageSuccess = (contact) => ({
  type: REMOVE_MESSAGE_SUCCESS,
  payload: contact,
});
export const removeMessageError = (error) => ({
  type: REMOVE_MESSAGE_ERROR,
  payload: error,
});

//RemoveAll
export const removeAllMessagesStart = () => ({
  type: REMOVE_ALL_MESSAGES_START,
});
export const removeAllMessagesSuccess = (contact) => ({
  type: REMOVE_ALL_MESSAGES_SUCCESS,
  payload: contact,
});
export const removeAllMessagesError = (error) => ({
  type: REMOVE_ALL_MESSAGES_ERROR,
  payload: error,
});

//Update
export const updateMessagesStart = () => ({
  type: UPDATE_MESSAGES_START,
});
export const updateMessagesSuccess = (messages) => ({
  type: UPDATE_MESSAGES_SUCCESS,
  payload: messages,
});
export const updateMessagesError = (error) => ({
  type: UPDATE_MESSAGES_ERROR,
  payload: error,
});