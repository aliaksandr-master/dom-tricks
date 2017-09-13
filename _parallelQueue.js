import once from 'lodash/once';
import times from 'lodash/times';
import isArray from 'lodash/isArray';
import forEach from 'lodash/forEach';
import constant from 'lodash/constant';



export default (array, iterator, done, skipErrors = false) => {
  if (!isArray(array) || !array || !array.length) {
    done();
    return;
  }

  const triggerDone = once(done);

  let count = array.length;

  const results = times(count, constant(null));

  forEach(array, (item, index) => {
    iterator(item, index, once((err, result) => {
      if (err) {
        if (!skipErrors) {
          triggerDone(err, null);
          return;
        }

        result = null;
      }

      results[index] = result;

      count--;

      if (!count) {
        triggerDone(null, results);
      }
    }));
  });
};
