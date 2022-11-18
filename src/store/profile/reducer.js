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

const initialState = {
  profile: {
    displayName: null,
    email: null,
    uid: null,
    photoURL: null,
    phoneNumber: null
  },
  pendingGet: false,
  errorGet: null,
  pendingUpdate: false,
  errorUpdate: null,
  pendingCreate: false,
  errorCreate: null,
  pendingRemove: false,
  errorRemove: null,
};

export const profileReducer = (state = initialState, action) => {
  const payload = action.payload
  switch (action.type) {
    //get
    case GET_PROFILE_START:
      return {
        ...state,
        pendingGet: true,
        errorGet: null,
      };
    case GET_PROFILE_SUCCESS:
      console.log('from switch profile --- ', payload)
      return {
        ...state,
        pendingGet: false,
        errorGet: null,
        profile: { ...payload }
      };
    case GET_PROFILE_ERROR:
      return {
        ...state,
        pendingGet: false,
        errorGet: payload,
      };
    //update
    case UPDATE_PROFILE_START:
      return {
        ...state,
        pendingUpdate: true,
        errorUpdate: null,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        pendingUpdate: false,
        errorUpdate: { message: 'Your profile updated' },
        profile: payload
      };
    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        pendingUpdate: false,
        errorUpdate: payload
      };
    //create
    case CREATE_PROFILE_START:
      return {
        ...state,
        pendingUpdate: true,
        errorUpdate: null,
      };
    case CREATE_PROFILE_SUCCESS:
      return {
        ...state,
        pendingUpdate: false,
        errorUpdate: null,
        profile: payload,
      };
    case CREATE_PROFILE_ERROR:
      return {
        ...state,
        pendingUpdate: false,
        errorUpdate: payload
      };
    //remove
    case REMOVE_PROFILE_START:
      return {
        ...state,
        pendingRemove: true,
        errorRemove: null,
      };
    case REMOVE_PROFILE_SUCCESS:
      return {
        ...state,
        ...initialState
      };
    case REMOVE_PROFILE_ERROR:
      return {
        ...state,
        pendingRemove: false,
        errorRemove: payload
      };
    default:
      return state;
  }
};