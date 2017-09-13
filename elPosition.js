export default (el) => { // http://youmightnotneedjquery.com/
  let top = 0;
  let left = 0;

  do {
    top += el.offsetTop || 0;
    left += el.offsetLeft || 0;
    el = el.offsetParent;
  } while (el);

  return { top, left };
};
