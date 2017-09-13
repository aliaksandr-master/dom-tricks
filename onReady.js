import once from 'lodash/once';
import PrimitiveEE from './_PrimitiveEE';



const stream = PrimitiveEE();
let fired = false;

const fire = () => {
  stream.emit();
  fired = true;
};

const bind = once(() => {
  if (document.readyState !== 'loading') {
    fire();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fire);
  } else {
    document.attachEvent('onreadystatechange', () => {
      if (document.readyState !== 'loading') {
        fire();
      }
    });
  }
});



export default (callback) => { // http://youmightnotneedjquery.com/
  bind();

  if (fired) {
    callback();
    return () => {};
  }

  return stream.on(callback);
};
