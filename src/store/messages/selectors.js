export const messagesSelector = (contactId) => (store) => {
  return store.messages.messageList[contactId] ?? [];
};
export const allMessagesSelector = () => (store) => {
  return store.messages.messageList ?? [];
};