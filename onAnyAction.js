import once from 'lodash/once';
import on from './on';
import onScroll from './onPageScroll';
import onResize from './onResize';



export default (callback) => {
  let off = null;
  let cleans = [];

  let handler = once(() => {
    off();
    callback();
  });

  off = once(() => {
    cleans.forEach((clean) => clean());
    handler = null;
    cleans = null;
  });

  cleans.push(on(document, 'click', handler));
  cleans.push(onScroll(handler));
  cleans.push(onResize(handler));

  return off;
};
