import {
  getProfileStart,
  getProfileSuccess,
  getProfileError,
  createProfileStart,
  createProfileSuccess,
  createProfileError,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileError,
  removeProfileStart,
  removeProfileSuccess,
  removeProfileError,
} from "./actions";

export const getProfile = (id) => async (dispatch, _, api) => {
  try {
    dispatch(getProfileStart());

    await api.getProfileApi(id); //@@TODO

    dispatch(getProfileSuccess(id));
  } catch (e) {
    dispatch(getProfileError(e));
  }
};

export const createProfile = (contact) => async (dispatch, _, api) => {
  try {
    dispatch(createProfileStart());

    await api.createProfileApi(contact); //@@TODO

    dispatch(createProfileSuccess(contact));
  } catch (e) {
    dispatch(createProfileError(e));
  }
};

export const updateProfile = (uid) => async (dispatch, _, api) => {
  let contacts = {};
  try {
    dispatch(updateProfileStart());

    await api.updateProfile(uid) //@@TODO

    dispatch(updateProfileSuccess(contacts));
  } catch (e) {
    dispatch(updateProfileError(e));
  }
};

export const removeProfile = (contact) => async (dispatch, _, api) => {
  try {
    dispatch(removeProfileStart());

    await api.removeProfileApi(contact); //@@TODO

    dispatch(removeProfileSuccess(contact));
  } catch (e) {
    dispatch(removeProfileError(e));
  }
};