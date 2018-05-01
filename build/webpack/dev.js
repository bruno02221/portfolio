const path = require("path");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const host = "127.0.0.1";
const port = "3000";

module.exports = {
  apply: function(webpackConfig, paths) {
    webpackConfig.entry.unshift(
      path.resolve(paths.root, `node_modules/webpack-dev-server/client`)
    );
  },

  execute: function(webpackConfig) {
    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(compiler, {
      quiet: true,
      publicPath: webpackConfig.output.publicPath
    });

    server.listen(port, host, () => {
      /* eslint-disable no-console */
      console.log(`Starting server on http://${host}:${port}`);
      /* eslint-enable no-console */
    });
  }
};
