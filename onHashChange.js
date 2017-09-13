import once from 'lodash/once';
import PrimitiveEE from './_PrimitiveEE';



const stream = PrimitiveEE();

let lastHash = window.location.hash;

const ping = () => {
  const hash = window.location.hash;

  if (hash !== lastHash) {
    stream.emit({ to: hash, from: lastHash });
    lastHash = hash;
  }

  setTimeout(ping, 100);
};

const bind = once(ping);

export default (callback) => {
  bind();

  return stream.on(callback);
};
