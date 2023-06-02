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

    const profile = await api.getProfileApi(uid);
    console.log('from getProfile thunk --- ', profile.data())

    dispatch(getProfileSuccess(profile.data()));
  } catch (e) {
    dispatch(getProfileError(e));
  }
};

export const createProfile = (contact) => async (dispatch, _, api) => {
  try {
    dispatch(createProfileStart());

    await api.createProfileApi(contact);
    await api.createProfileContacts(contact.uid);

    dispatch(createProfileSuccess(contact));
  } catch (e) {
    dispatch(createProfileError(e));
  }
};

export const updateProfile = (profile) => async (dispatch, _, api) => {
  try {
    dispatch(updateProfileStart());

    await api.updateProfileApi(profile)

    dispatch(updateProfileSuccess(profile));
  } catch (e) {
    dispatch(updateProfileError(e));
  }
};

export const removeProfile = (contact) => async (dispatch, _, api) => {
  try {
    dispatch(removeProfileStart());

    await api.removeProfileApi(contact);

    dispatch(removeProfileSuccess(contact));
  } catch (e) {
    dispatch(removeProfileError(e));
  }
};