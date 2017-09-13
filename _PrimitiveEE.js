import isFunction from 'lodash/isFunction';
import once from 'lodash/once';
import over from 'lodash/over';
import filter from 'lodash/filter';



export default () => {
  let listeners = [];

  return {
    emit: (...args) => over(listeners)(...args),

    cleanup () {
      listeners = [];
    },

    on (callback) {
      if (!isFunction(callback)) {
        throw new TypeError('callback must be a function');
      }

      listeners.push(callback);

      return once(() => {
        if (!listeners.length) {
          return;
        }

        listeners = filter(listeners, (cbk) => cbk !== callback);
      });
    }
  };
};
