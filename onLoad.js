import once from 'lodash/once';
import decorate from './_decorate';
import PrimitiveEE from './_PrimitiveEE';



const stream = PrimitiveEE();
let fired = false;

const bind = once(() => {
  window.onload = decorate(window.onload, () => {
    fired = true;
    stream.emit();
  });
});

export default (fn) => {
  if (fired) {
    fn();
    return () => {};
  }

  bind();

  const off = stream.on(() => {
    off();
    fn();
  });

  return off;
};
