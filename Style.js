import once from 'lodash/once';
import appendElement from './append';



export default () => {
  let style = document.createElement('style');
  let prevContent = '';

  const removeElement = appendElement(document.body, style);

  let destroyed = false;

  const set = (content) => {
    if (destroyed || content === prevContent) {
      return;
    }

    prevContent = content;

    style.innerHTML = content;
  };

  return {
    set (content = '') {
      set(content);
    },

    cleanup () {
      if (destroyed) {
        return;
      }

      setTimeout(() => {
        set('');
      }, 0);
    },

    destroy: once(() => {
      destroyed = true;
      removeElement();

      style = null;
    })
  };
};
