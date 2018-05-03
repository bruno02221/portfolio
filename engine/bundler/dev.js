const path = require("path");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const host = "127.0.0.1";
const port = "3000";

module.exports = (webpackConfig, paths) => {
  webpackConfig.mode = "development";
  webpackConfig.entry.unshift(
    path.resolve(paths.root, `node_modules/webpack-dev-server/client`)
  );

  const webpackCompiler = webpack(webpackConfig);
  const server = new WebpackDevServer(webpackCompiler, {
    quiet: true,
    publicPath: webpackConfig.output.publicPath
  });

  server.listen(port, host, () => {
    /* eslint-disable no-console */
    console.log(`Starting server on http://${host}:${port}`);
    /* eslint-enable no-console */
  });
};
