import iterate from './forEach';



export default (element) => {
  let val = '';

  iterate(element, (element, i) => {
    if (i !== 0) {
      return false;
    }

    val = String(element.value || '');

    return true;
  });

  return val;
};
