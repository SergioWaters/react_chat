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

const initialState = {
  contactList: {},
  pendingGet: false,
  errorGet: null,
  pendingCreate: false,
  errorCreate: null,
  pendingRemove: false,
  errorRemove: null,
};

export const contactsReducer = (state = initialState, action) => {
  const payload = action.payload
  switch (action.type) {
    //Get
    case GET_CONTACTS_START:
      return { ...state, pendingGet: true, errorGet: null };
    case GET_CONTACTS_SUCCESS:
      return { ...state, pendingGet: false, contactList: { ...payload } };
    case GET_CONTACTS_ERROR:
      return { ...state, pendingGet: false, errorGet: payload };

    //Create
    case CREATE_CONTACT_START:
      return { ...state, pendingCreate: true, errorCreate: null };
    case CREATE_CONTACT_SUCCESS:
      return {
        ...state,
        pendingCreate: false,
        errorCreate: null,
        contactList: { ...state.contactList, [payload.uid]: payload },
      };
    case CREATE_CONTACT_ERROR:
      return { ...state, pendingCreate: false, errorCreate: payload };

    //Remove
    case REMOVE_CONTACT_START:
      return { ...state, pendingRemove: false, errorRemove: null };

    case REMOVE_CONTACT_SUCCESS:
      delete state.contactList[payload];
      return {
        ...state,
        pendingRemove: false,
        errorRemove: null,
      };
    case REMOVE_CONTACT_ERROR:
      return { ...state, pendingRemove: false, errorRemove: payload };
    default:
      return state;
  }
};