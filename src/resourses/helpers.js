export const getDate = () => {
  return (new Date()).toLocaleString("ru-RU")
}
export const getId = () => {
  return Math.floor(Date.now() * Math.random()).toString()
};