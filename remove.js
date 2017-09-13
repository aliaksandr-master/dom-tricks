import forEach from './forEach';



export default (element) => {
  forEach(element, (element) => {
    element.parentNode.removeChild(element);
  });
};
