let timerId;
const debounce = (callback, time) => {
  clearTimeout(timerId);
  //console.info(callback);
  timerId = setTimeout(callback, time);
};

export default debounce;
