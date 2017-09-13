import trim from 'lodash/trim';
import iterate from './forEach';



export const hasClass = (element, className) => {
  if (!className) {
    return false;
  }

  let result = true;

  const processed = iterate(element, (element) => {
    if (!result) {
      return false;
    }

    result = (` ${element.className} `).indexOf(` ${className} `) !== -1;

    return true;
  });

  return Boolean(processed && result);
};

export const removeClass = (element, className) =>
  iterate(element, (element) => {
    if (!hasClass(element, className)) {
      return false;
    }

    element.className = trim((` ${element.className} `).replace(` ${className} `, ' '));

    return true;
  });

export const addClass = (element, className) =>
  iterate(element, (element) => {
    if (hasClass(element, className)) {
      return false;
    }

    element.className = `${element.className} ${className}`;

    return true;
  });
