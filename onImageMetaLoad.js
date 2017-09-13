import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import asyncForEach from './_parallelQueue';
import relFunc from './_relFunc';



const calcImageObjProps = (imageElement) => {
  const width = imageElement.naturalWidth || imageElement.width || null;
  const height = imageElement.naturalHeight || imageElement.height || null;

  return {
    url: imageElement.src,
    width,
    height,
    $ratio: (width && height) ? (height / width) : null
  };
};



const onImageComplete = (imageSrc, callback, maxTimeWaitingForLoading = 0) => {
  const func = relFunc();
  const img = new window.Image();

  const resolveIfImageLoadedAlready = func(() => callback(null, img));

  img.onload = func(() => callback(null, img));
  img.onerror = func(() => callback(true, img));

  if (maxTimeWaitingForLoading) {
    setTimeout(func(() => callback(true, img)), maxTimeWaitingForLoading);
  }

  img.src = imageSrc;

  if (img.naturalWidth || img.width || img.naturalHeight || img.height) {
    resolveIfImageLoadedAlready(img);
  }
};


/**
 * @param {Object[]} images
 * @param {String} images.url
 * @param {Number?} images.width
 * @param {Number?} images.height
 * @param {Function} callback
 * @returns {Undefined}
 * */
export default (images, callback) => {
  asyncForEach(isArray(images) || !images ? images : [ images ], (img, index, done) => {
    if (isString(img)) {
      img = { url: img };
    }

    if (!img || !img.url) {
      done(null, null);
      return;
    }

    if (img.width && img.height) {
      done(null, img);
    }

    onImageComplete(img.url, (err, imageElement) => {
      if (err) {
        done(err);
      }

      done(null, { ...img, ...calcImageObjProps(imageElement) });
    }, 7000);
  }, callback, true);
};
