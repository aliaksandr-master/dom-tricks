import on from './on';



const document = window.document;

export default (handler) => on(document, 'keydown', (ev) => {
  handler(ev, String(ev.key).toUpperCase());
});
