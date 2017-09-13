import onScroll from './onPageScroll';



export default (callback, { initial = false } = {}) => { // check max deepness of scrolling
  let off = null;
  let counter = 0;
  let maxTop = 0;
  let maxLeft = 0;

  off = onScroll((scroll, viewport) => {
    const time = counter++;

    if (!(initial && !time) && maxTop >= scroll.top && maxLeft >= scroll.left) {
      return;
    }

    if (maxTop < scroll.top) {
      maxTop = scroll.top;
    }

    if (maxLeft < scroll.left) {
      maxLeft = scroll.left;
    }

    const maxDepthV = maxTop + viewport.height;
    const maxDepthH = maxLeft + viewport.width;
    const maxProgressV = scroll.height ? maxDepthV / scroll.height : 0;
    const maxProgressH = scroll.width ? maxDepthH / scroll.width : 0;

    callback({
      max_depth_vertical: maxDepthV,
      max_depth_horizontal: maxDepthH,
      progress_vertical: maxProgressV > 1 ? '1' : Number(maxProgressV).toFixed(3),
      progress_horizontal: maxProgressH > 1 ? '1' : Number(maxProgressH).toFixed(3),
      scroll_left: scroll.left,
      scroll_top: scroll.top,
      scroll_width: scroll.width,
      scroll_height: scroll.height,
      viewport_width: viewport.width,
      viewport_height: viewport.height
    }, time);

    if (maxProgressV >= 1 && maxProgressH >= 1) {
      off();
    }
  }, initial);

  return off;
};
