import forEach from './forEach';



export default (elements, childMayBe, checkExactEl = true) => {
  let hasFound = false;

  forEach(elements, (element) => {
    if (hasFound) {
      return;
    }

    hasFound = (checkExactEl ? element === childMayBe : false) || element.contains(childMayBe);
  });

  return hasFound;
};
