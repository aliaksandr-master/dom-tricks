import iterate from './forEach';



export default (element, htmlString) =>
  iterate(element, (element) => {
    element.innerHTML = htmlString;
  });
