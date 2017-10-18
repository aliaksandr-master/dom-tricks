/*eslint-env node*/

const path = require('path');
const webpack = require('webpack');



const NODE_ENV = process.env.NODE_ENV || 'production'; // eslint-disable-line
const DIR_BABEL_CACHE_DIR = path.resolve(__dirname, '.tmp/babel');



const config = {};



config.output = {
  path: path.join(__dirname, '.tmp/release'),
  pathinfo: true,
  filename: '[name].js'
};



config.entry = {
  'dom-tricks': [
    path.join(__dirname, 'index.js')
  ]
};



config.externals = {
};



config.module = {};



config.module.rules = [
  {
    test: /\.(?:jsx?)(?:\?.*)?$/i,
    exclude: [],
    use: [
      `babel-loader?cacheDirectory=${DIR_BABEL_CACHE_DIR}`
    ]
  }
];



config.plugins = [];



config.plugins.push(new webpack.NoErrorsPlugin());



config.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
}));



config.resolve = {
  modules: [
    __dirname,
    'node_modules'
  ],
  extensions: [ '.js' ],
  alias: {}
};



config.resolveLoader = {
  alias: {}
};



config.watch = false;


config.context = __dirname;
config.node = {
  __filename: true
};


module.exports = config;
