let timerId;
export const debounce = (callback, time) => {
  clearTimeout(timerId);
  //console.info(callback);
  timerId = setTimeout(callback, time);
};
export const format = (time) => {
  return time < 10 ? `0${time}` : `${time}`;
};
export const getBaseDate = () => {
  const date = new Date();
  return `${date.getFullYear()}${format(date.getMonth() + 1)}${format(
    date.getDate()
  )}`;
};
