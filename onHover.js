import over from 'lodash/over';
import on from './on';



export default (element, onEnter = () => {}, onLeave = () => {}) =>
  over([
    on(element, 'mouseenter', onEnter),
    on(element, 'mouseleave', onLeave)
  ]);
