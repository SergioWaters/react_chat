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

export const getProfile = (uid) => async (dispatch, _, api) => {
  try {
    dispatch(getProfileStart());

    const profile = await api.getProfileApi(uid); //@@TODO

    dispatch(getProfileSuccess(profile.data()));
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

export const updateProfile = (profile) => async (dispatch, _, api) => {
  try {
    dispatch(updateProfileStart());

    await api.updateProfileApi(profile) //@@TODO

    dispatch(updateProfileSuccess(profile));
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