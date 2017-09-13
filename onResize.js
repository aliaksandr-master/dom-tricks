import once from 'lodash/once';
import throttle from 'lodash/throttle';
import decorate from './_decorate';
import PrimitiveEE from './_PrimitiveEE';
import elementSize from './elSize';



const stream = PrimitiveEE();

const bind = once(() => {
  window.onresize = decorate(window.onresize, throttle(stream.emit, 150));
});

/**
 * @param {Element|Function} element
 * @param {Function} callback
 * @param {Boolean} initial
 * @returns {Function} off
 * */
export default (element, callback = null, initial = false) => {
  if (callback === null) {
    callback = element;
    element = null;
  }

  bind();

  if (element !== null) {
    const _callback = callback;

    let size = elementSize(element);

    callback = (ev) => {
      const _size = elementSize(element);

      if (_size.width !== size.width || _size.heigth !== size.height) {
        size = _size;
        _callback(ev, size);
      }
    };
  }

  if (initial) {
    callback(null);
  }

  return stream.on(callback);
};
