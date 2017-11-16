import once from 'lodash/once';



export default (func, delay = 0) => {
  let destroyed = false;
  let iteration = 0;

  const timer = setTimeout(() => {
    if (!destroyed) {
      func(iteration++);
    }
  }, delay);

  return once(() => {
    destroyed = true;
    clearTimeout(timer);
  });
};
