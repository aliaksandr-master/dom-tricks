// clone of https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js

const isTouchDevice = () => {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (_err) {
    return false;
  }
};

export default Boolean(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch) || isTouchDevice();
