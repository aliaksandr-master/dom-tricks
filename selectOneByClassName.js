import selectAllByClassName from './selectAllByClassName';



export default (parent, className, defaults = null) => selectAllByClassName(parent, className)[0] || defaults;
