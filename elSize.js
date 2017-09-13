export const outerHeight = (el) => { // http://youmightnotneedjquery.com/
  let height = el.offsetHeight;
  const style = el.currentStyle || window.getComputedStyle(el);

  height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);

  return height;
};

export const outerWidth = function outerWidth (el) { // http://youmightnotneedjquery.com/
  let width = el.offsetWidth;
  const style = el.currentStyle || window.getComputedStyle(el);

  width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);

  return width;
};


export default (el) => ({
  width: outerWidth(el),
  height: outerHeight(el)
});
