export const getDate = () => {
  return new Date().toLocaleString("ru-RU");
};
export const getId = () => {
  return Math.floor(Date.now() * Math.random()).toString();
};

export const getFormattedDate = (date) => {
  const addZero = (number) => ("00" + number).slice(-2);

  const dateObj = new Date(date);
  const day = addZero(dateObj.getDate());
  const month = addZero(dateObj.getMonth() + 1);
  const hours = addZero(dateObj.getHours());
  const minutes = addZero(dateObj.getMinutes());

  return `${day}.${month}  ${hours}:${minutes}`;
};
