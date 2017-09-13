import forEach from './forEach';



export default (element, string) =>
  forEach(element, (element) => {
    element.innerText = string;
  });
