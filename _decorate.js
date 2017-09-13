import over from 'lodash/over';



export default (srcFunc, callAfterSrcMethod) => {
  if (!srcFunc) {
    return callAfterSrcMethod;
  }

  return over([ srcFunc, callAfterSrcMethod ]);
};
