import scroll from './elScroll';
import elementScroll from './scrollEl';
import iterate from './forEach';
import viewportSize from './viewportSize';



const isVisible = (el) => {
  let visible = true;

  while (el && visible) {
    if (el === document) {
      return true;
    }
    const styles = window.getComputedStyle(el);

    visible = visible && styles.display !== 'none' && styles.visibility !== 'hidden';
    el = el.parentNode;
  }

  return visible;
};

const intersection = (x1, w1, x2, w2) => {
  const minX = x2 > x1 ? x1 : x2;

  x1 -= minX;
  x2 -= minX;

  const aX = x2 >= x1 ? x1 : x2;
  const aW = x2 >= x1 ? w1 : w2;
  const aL = aX + aW;

  const bX = x2 >= x1 ? x2 : x1;
  const bW = x2 >= x1 ? w2 : w1;
  const bL = bX + bW;

  const len = bL > aL ? bL : aL;

  const intersection = aW + bW - len;

  return intersection > 0 ? intersection : 0;
};


export default (element, rate = 1) => {
  let visible = true;

  const viewportPosition = scroll(elementScroll());
  const viewport = viewportSize();

  const elementsCount = iterate(element, (element) => {
    /** @var {DomElement} element */
    if (!visible) {
      return;
    }

    const clientRects = element.getClientRects();

    if (!clientRects.length) {
      visible = false;

      return;
    }

    const clientRectList = clientRects[0];
    const width = clientRectList.right - clientRectList.left;
    const height = clientRectList.bottom - clientRectList.top;

    if (height <= 0 || width <= 0) {
      visible = false;

      return;
    }

    if (!isVisible(element)) {
      visible = false;
      return;
    }

    const intersectionX = intersection(viewportPosition.left, viewport.width, clientRectList.left, width);
    const intersectionY = intersection(viewportPosition.top, viewport.height, clientRectList.top, height);

    const intersectionArea = intersectionX * intersectionY;
    const elementArea = width * height;

    const elementVisibleRate = elementArea ? intersectionArea / elementArea : 0;

    //  const visibleV = (viewportPosition.top + viewport.height) - (clientRectList.top + clientRectList.height) >= 0;
    //  const visibleH = (viewportPosition.left + viewport.width) - (clientRectList.left + clientRectList.width) >= 0;

    visible = elementVisibleRate >= rate;
  });

  return Boolean(visible && elementsCount);
};
