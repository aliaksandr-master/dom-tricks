export default (el) => ({
  top: el.scrollTop,
  left: el.scrollLeft,
  width: el.scrollWidth,
  height: el.scrollHeight
});
