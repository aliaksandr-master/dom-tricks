import forEach from './forEach';



export default (element, processor) => {
  const results = [];

  forEach(element, (el, index) => {
    results.push(processor(el, index));
  });

  return results;
};
