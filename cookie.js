/* eslint-disable lodash/prefer-lodash-typecheck */
import forEach from 'lodash/forEach';
import trim from 'lodash/trim';



const tryDecode = (str, decode) => {
  try {
    return decode(str);
  } catch (_err) {
    return str;
  }
};

const parse = (str) => { // https://github.com/jshttp/cookie/blob/master/index.js
  const obj = {};

  forEach(str.split(/; */), (pair) => {
    let eqIdex = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eqIdex < 0) {
      return;
    }

    const key = trim(pair.substr(0, eqIdex));
    let val = trim(pair.substr(++eqIdex, pair.length));

    // quoted values
    if (val[0] === '"') {
      val = val.slice(1, -1);
    }

    // only assign once
    if (obj[key] == null) {
      obj[key] = tryDecode(val, decodeURIComponent);
    }
  });

  return obj;
};



export const set = (name, value, { expires, domain, path } = {}) => {
  let updatedCookie = `${name}=${typeof value === 'boolean' ? String(Number(value)) : String(encodeURIComponent(value))}`;

  if (expires) {
    if (typeof expires === 'number') {
      const date = new Date();

      date.setTime(date.getTime() + expires * 1000);
      expires = date;
    }

    if (expires.toUTCString) {
      expires = expires.toUTCString();
    }

    updatedCookie = `${updatedCookie}; Expires=${expires}`;
  }

  if (domain) {
    updatedCookie = `${updatedCookie}; Domain=${domain}`;
  }

  if (path) {
    updatedCookie = `${updatedCookie}; Path=${path}`;
  }

  document.cookie = updatedCookie;
};

const cache = {};

export const get = (name, defaults) => {
  const cookieString = window.document.cookie;

  if (!cache.hasOwnProperty(cookieString)) {
    cache[cookieString] = parse(cookieString);
  }

  const allCookies = cache[cookieString];

  return allCookies.hasOwnProperty(name) ? allCookies[name] : defaults;
};
