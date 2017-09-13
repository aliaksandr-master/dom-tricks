import once from 'lodash/once';
import over from 'lodash/over';
import on from './on';
import map from './map';



export default (elements, callback) =>
  once(over(map(elements, (element) => on(element, 'click', (ev) => {
    const href = element.href;

    if (href) {
      ev.preventDefault();
    }

    callback(ev, () => {
      if (!href) {
        return;
      }

      window.location.href = href;
    });
  }))));
