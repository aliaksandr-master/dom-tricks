import throttle from 'lodash/throttle';
import over from 'lodash/over';
import once from 'lodash/once';
import onDelay from './onDelay';
import scroll from './elScroll';
import on from './on';
import viewportSize from './viewportSize';



export default (callback, asyncInitialCall = false, delay = 150) => {
  const body = document.body;
  const trigger = () => {
    const viewportMain = viewportSize();
    const scrollBody = scroll(body);
    const scrollElement = scroll(document.documentElement);

    if (scrollBody.top >= 0 && scrollElement.top === 0) { // NOTE scrollElement for safari browser
      callback(scrollBody, viewportMain);
    } else {
      callback(scrollElement, viewportMain);
    }
  };

  return once(over([
    !asyncInitialCall ? () => {} : onDelay(trigger, 0),
    on(window, 'scroll', throttle(trigger, delay, { leading: false }))
  ]));
};
