import once from 'lodash/once';
import onDelay from './onDelay';



export default (func, delay = 0) => {
  let destroy = () => {};

  const ping = () => {
    destroy = onDelay((iteration) => {
      Promise.resolve(func(iteration)).then(ping);
    }, delay);
  };

  return once(() => destroy());
};
