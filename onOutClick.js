import isFunction from 'lodash/isFunction';
import on from './on';
import isSomeChild from './isSomeChild';



const document = window.document;

export default (getElements, handlerOut, handleIn) => {
  if (!isFunction(getElements)) {
    const elements = getElements;

    getElements = () => elements;
  }

  if (!handleIn && !handlerOut) {
    return () => {};
  }

  return on(document, 'click', (ev) => {
    if (isSomeChild(getElements(), ev.target, true)) {
      if (handleIn) {
        handleIn(ev);
      }
    } else {
      if (handlerOut) {
        handlerOut();
      }
    }
  });
};
