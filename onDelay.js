import once from 'lodash/once';



export default (func, delay = 0) => {
  let destroyed = false;
  const timer = setTimeout(() => {
    if (!destroyed) {
      func();
    }
  }, delay);

  return once(() => {
    destroyed = true;
    clearTimeout(timer);
  });
};
