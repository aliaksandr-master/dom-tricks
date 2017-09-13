export default (findFn, startElement, lastParent = null) => {
  let el = startElement;

  do {
    if (findFn(el)) {
      return el;
    }

    if (lastParent && lastParent === el) {
      return null;
    }

    el = el.parentNode;
  } while (el);

  return null;
};
