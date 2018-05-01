const webpack = require("webpack");

module.exports = {
  execute: function(webpackConfig) {
    const compiler = webpack(webpackConfig);
    compiler.run();
  }
};
