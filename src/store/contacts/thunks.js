import {
  getContactsStart,
  getContactsSuccess,
  getContactsError,
  createContactStart,
  createContactSuccess,
  createContactError,
  removeContactStart,
  removeContactSuccess,
  removeContactError,
} from "./actions";

export const getContacts = () => async (dispatch, _, api) => {
  let contacts = {};
  try {
    dispatch(getContactsStart());

    const snapshot = await api.getContactsApi();
    snapshot.forEach((snap) => {
      const { uid, email } = snap.data();
      contacts[uid] = email;
    });

    dispatch(getContactsSuccess(contacts));
  } catch (e) {
    dispatch(getContactsError(e));
  }
};

export const createContact = (contact) => async (dispatch, _, api) => {
  try {
    dispatch(createContactStart());

    await api.createContactApi(contact);

    dispatch(createContactSuccess(contact));
  } catch (e) {
    dispatch(createContactError(e));
  }
};

export const deleteContact = (contact) => async (dispatch, _, api) => {
  try {
    dispatch(removeContactStart());

    await api.removeContactApi(contact);

    dispatch(removeContactSuccess(contact));
  } catch (e) {
    dispatch(removeContactError(e));
  }
};