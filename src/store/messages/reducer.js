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
  REMOVE_ALL_MESSAGES_ERROR
} from "./types";

const initialState = {
  messageList: {},
  pendingGet: false,
  errorGet: null,
  pendingCreate: false,
  errorCreate: null,
  pendingRemove: false,
  errorRemove: null,
  pendingRemoveAll: false,
  errorRemoveAll: null,
};

export const messagesReducer = (state = initialState, action) => {
  const payload = action.payload
  switch (action.type) {
    //Get
    case GET_MESSAGES_START:
      return { ...state, pendingGet: true, errorGet: null };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state, pendingGet: false,
        messageList: { ...state.messageList, [payload.key]: payload.messages }
      };
    case GET_MESSAGES_ERROR:
      return { ...state, pendingGet: false, errorGet: payload };

    //Create
    case CREATE_MESSAGE_START:
      return { ...state, pendingCreate: true, errorCreate: null };
    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        pendingCreate: false,
        messageList: { ...state.messageList, [payload.id]: payload.author },
      };
    case CREATE_MESSAGE_ERROR:
      return { ...state, pendingCreate: false, errorCreate: payload };

    //Remove Message
    case REMOVE_MESSAGE_START:
      return { ...state, pendingRemove: false, errorRemove: null };

    case REMOVE_MESSAGE_SUCCESS:
      console.log('from remove success ', payload)
      delete state.messageList[payload.authorId][payload.messageId];
      return {
        ...state,
        pendingRemove: false, errorRemove: null,
      };
    case REMOVE_MESSAGE_ERROR:
      return { ...state, pendingRemove: false, errorRemove: payload };

    //RemoveAll Messages
    case REMOVE_ALL_MESSAGES_START:
      return { ...state, pendingRemoveAll: false, errorRemoveAll: null };

    case REMOVE_ALL_MESSAGES_SUCCESS:
      console.log('from removeAll success ', payload)
      delete state.messageList[payload];
      return {
        ...state,
        pendingRemoveAll: false, errorRemoveAll: null,
      };
    case REMOVE_ALL_MESSAGES_ERROR:
      return { ...state, pendingRemoveAll: false, errorRemoveAll: payload };
    default:
      return state;
  }
};