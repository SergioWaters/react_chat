import {
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  CREATE_PROFILE_START,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_ERROR,
  REMOVE_PROFILE_START,
  REMOVE_PROFILE_SUCCESS,
  REMOVE_PROFILE_ERROR
} from "./types";

//get
export const getProfileStart = (data) => ({
  type: GET_PROFILE_START
});
export const getProfileSuccess = (profile) => ({
  type: GET_PROFILE_SUCCESS, payload: profile
});
export const getProfileError = (error) => ({
  type: GET_PROFILE_ERROR, payload: error
});

//Update
export const updateProfileStart = (data) => ({
  type: UPDATE_PROFILE_START
});
export const updateProfileSuccess = (profile) => ({
  type: UPDATE_PROFILE_SUCCESS, payload: profile
});
export const updateProfileError = (error) => ({
  type: UPDATE_PROFILE_ERROR, payload: error
});

//Create
export const createProfileStart = (data) => ({
  type: CREATE_PROFILE_START
});
export const createProfileSuccess = (profile) => ({
  type: CREATE_PROFILE_SUCCESS, payload: profile
});
export const createProfileError = (error) => ({
  type: CREATE_PROFILE_ERROR, payload: error
});

//remove
export const removeProfileStart = (data) => ({
  type: REMOVE_PROFILE_START
});
export const removeProfileSuccess = (profile) => ({
  type: REMOVE_PROFILE_SUCCESS, payload: profile
});
export const removeProfileError = (error) => ({
  type: REMOVE_PROFILE_ERROR, payload: error
});
