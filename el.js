import forEach from 'lodash/forEach';



export default (tag, props = null) => {
  const el = document.createElement(tag);

  forEach(props, (val, key) => {
    if (val == null) {
      return;
    }

    el[key] = val;
  });

  return el;
};
