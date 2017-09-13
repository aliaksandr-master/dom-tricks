export default (funcDone = () => {}) => {
  let done = false;

  return (func, result = null) => (...args) => {
    if (done) {
      return result;
    }

    done = true;

    func(...args);
    funcDone();

    return result;
  };
};
