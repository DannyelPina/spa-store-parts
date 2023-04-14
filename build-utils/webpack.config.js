const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = (env, argv) => {
  const envConfig = argv.mode === 'development' ? require(`./webpack.dev.js`) : require(`./webpack.prod.js`)
  // merge default configuration with a chosen mode configuration
  return merge(commonConfig, envConfig);
};