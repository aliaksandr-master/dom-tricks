export const insertHTML = (element, html, method = 'beforeEnd') => {
  if (!element) {
    return;
  }

  element.insertAdjacentHTML(method, html);
};

