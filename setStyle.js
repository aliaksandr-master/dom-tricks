import memoize from 'lodash/memoize';
import elementForEach from './forEach';



const bodyStyle = document.body.style;
const VENDOR_PREFIXES = [ 'moz', 'webkit', 'o', 'ms' ];

const getProp = memoize((propSrc) => {
  let prop = propSrc;

  if (!(prop in bodyStyle)) {
    let _prop;

    for (let i = 0; i < VENDOR_PREFIXES.length; i++) {
      _prop = VENDOR_PREFIXES[i] + prop.charAt(0).toUpperCase() + prop.slice(1);
      if (_prop in bodyStyle) {
        prop = _prop;
        break;
      }
    }
  }

  return prop;
});

export default (element, prop, value) => {
  prop = getProp(prop);

  elementForEach(element, (el) => {
    el.style[prop] = value;
  });
};
