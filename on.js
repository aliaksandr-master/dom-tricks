import once from 'lodash/once';
import iterate from './forEach';



const off = (domElements, eventName, handler) => // http://youmightnotneedjquery.com/
  iterate(domElements, (domElement) => {
    if (domElement.removeEventListener) {
      domElement.removeEventListener(eventName, handler);
      return;
    }

    domElement.detachEvent(`on${eventName}`, handler);
  });


const on = (domElements, eventName, handler, props) => // http://youmightnotneedjquery.com/
  iterate(domElements, (domElement) => {
    if (domElement.addEventListener) {
      if (props == null) {
        domElement.addEventListener(eventName, handler, props);
      } else {
        domElement.addEventListener(eventName, handler);
      }
      return;
    }

    domElement.attachEvent(`on${eventName}`, handler);
  });


/**
 * @param {Element|Window|Document} domElement
 * @param {String} eventName
 * @param {Function} callback
 * @param {Object} [props]
 * @returns {Function}
 * */
const onEvent = (domElement, eventName, callback, props = undefined) => {
  if (!domElement || !eventName || !callback) {
    return () => {};
  }

  on(domElement, eventName, callback, props);

  return once(() => {
    off(domElement, eventName, callback, props);
  });
};

export default onEvent;

export const one = (domElement, eventName, callback) => {
  const off = onEvent(domElement, eventName, once((...args) => {
    off();
    callback(...args);
  }));

  return off;
};
