import {
  GET_CONTACTS_START,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_ERROR,
  CREATE_CONTACT_START,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_ERROR,
  REMOVE_CONTACT_START,
  REMOVE_CONTACT_ERROR,
  REMOVE_CONTACT_SUCCESS,
} from "./types";

//Get
export const getContactsStart = () => ({
  type: GET_CONTACTS_START,
});
export const getContactsSuccess = (contacts) => ({
  type: GET_CONTACTS_SUCCESS,
  payload: contacts,
});
export const getContactsError = (error) => ({
  type: GET_CONTACTS_ERROR,
  payload: error,
});

//Create
export const createContactStart = () => ({
  type: CREATE_CONTACT_START,
});
export const createContactSuccess = (contacts) => ({
  type: CREATE_CONTACT_SUCCESS,
  payload: contacts,
});
export const createContactError = (error) => ({
  type: CREATE_CONTACT_ERROR,
  payload: error,
});

//Remove
export const removeContactStart = () => ({
  type: REMOVE_CONTACT_START,
});
export const removeContactSuccess = (contact) => ({
  type: REMOVE_CONTACT_SUCCESS,
  payload: contact,
});
export const removeContactError = (error) => ({
  type: REMOVE_CONTACT_ERROR,
  payload: error,
});