import {
  getMessagesStart,
  getMessagesSuccess,
  getMessagesError,
  createMessageStart,
  createMessageSuccess,
  createMessageError,
  removeMessageStart,
  removeMessageSuccess,
  removeMessageError,
  removeAllMessagesStart,
  removeAllMessagesSuccess,
  removeAllMessagesError,
  updateMessagesStart,
  updateMessagesSuccess,
  updateMessagesError,
} from "./actions";

export const getMessages = (key) => async (dispatch, _, api) => {
  const messages = [];
  try {
    dispatch(getMessagesStart());

    const snapshot = await api.getMessagesApi(key);
    console.log('from get messages - ', snapshot);
    snapshot.forEach((snap) => {
      messages.push(snap.val());
    });

    dispatch(getMessagesSuccess({ key: key, messages: messages }));
  } catch (e) {
    dispatch(getMessagesError(e));
  }
};

export const createMessage = (message) => async (dispatch, _, api) => {
  try {
    dispatch(createMessageStart());

    await api.createMessageApi(message);

    dispatch(createMessageSuccess(message));
  } catch (e) {
    dispatch(createMessageError(e));
  }
};

export const deleteMessage = (message) => async (dispatch, _, api) => {
  try {
    dispatch(removeMessageStart());

    await api.removeMessageApi(message);

    dispatch(removeMessageSuccess(message));
  } catch (e) {
    dispatch(removeMessageError(e));
  }
};

export const deleteAllMessages = (message) => async (dispatch, _, api) => {
  try {
    dispatch(removeAllMessagesStart());

    await api.removeAllMessagesApi(message);

    dispatch(removeAllMessagesSuccess(message));
  } catch (e) {
    dispatch(removeAllMessagesError(e));
  }
};

export const updateMessagesOnChange = (key) => async (dispatch, _, api) => {
  const messArr = {
    key: key,
    messages: []
  };
  try {
    dispatch(getMessagesStart());

    api.onMessagesAddedApi(key, (s) => {
      s.forEach(v => messArr.messages.push(v.val()))
    });

    dispatch(getMessagesSuccess(messArr))

  } catch (e) {
    dispatch(updateMessagesError(e))
  }
}