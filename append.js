import once from 'lodash/once';



export default (host, element) => {
  host.appendChild(element);

  return once(() => {
    host.removeChild(element);
  });
};
