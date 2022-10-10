export const gistsSelector = () => (store) => {
  return store.gists ?? [];
};