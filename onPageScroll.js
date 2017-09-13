import throttle from 'lodash/throttle';
import over from 'lodash/over';
import max from 'lodash/max';
import once from 'lodash/once';
import PrimitiveEE from './_PrimitiveEE';
import decorate from './_decorate';
import map from './map';
import onDelay from './onDelay';
import scroll from './elScroll';
import on from './on';
import viewportSize from './viewportSize';
import elementSize from './elSize';



const DELAY = 1000;

const stream = PrimitiveEE();

const bind = once(() => {
  window.onscroll = decorate(window.onscroll, stream.emit, 1000);
});

let counter = 0;

const getRectLeftTop = (element) => {
  const rect = element.getBoundingClientRect() || {};

  return {
    top: rect.top || 0,
    left: rect.left || 0
  };
};

export default (callback, asyncInitialCall = false, delay = DELAY) => {
  bind();
  const body = document.body;

  const scrollingDIV = document.createElement('div');

  scrollingDIV.id = `scrolling-fake-div-${counter++}`;

  body.insertBefore(scrollingDIV, body.firstChild);

  const contentHeight = throttle(() => max(map(body.children, (el) => el.offsetHeight)), 500, { trailing: false });

  const getScroll = () => { // hack for supporting chrome/safari bug with scrollTop
    const bodyRect = getRectLeftTop(body);
    const elRect = getRectLeftTop(scrollingDIV);

    return {
      top: bodyRect.top - elRect.top,
      left: bodyRect.left - elRect.left,
      height: contentHeight(),
      width: scrollingDIV.offsetWidth
    };
  };

  const trigger = throttle(callback, delay, { leading: false });

  return once(over([
    !asyncInitialCall ? () => {} : onDelay(() => {
      const viewportBody = elementSize(body);
      const viewportMain = viewportSize();

      if (viewportBody.height >= viewportMain.height) {
        callback(scroll(document.body), viewportMain);
      } else {
        callback(getScroll(), viewportBody);
      }
    }, 0),
    on(document.body, 'scroll', () => {
      trigger(getScroll(), elementSize(body));
    }),
    stream.on(() => {
      trigger(scroll(document.body), viewportSize());
    }),
    () => {
      body.removeChild(scrollingDIV);
    }
  ]));
};
