const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  build: ({ mode, paths }) => {
    const template = require(paths.template);

    const webpackConfig = {
      entry: [path.resolve(paths.template, template.entry.js)],
      output: {
        filename: `${template.name}.js`,
        path: paths.dist,
        publicPath: "/"
      },
      module: {
        rules: [{ test: /\.js$/, use: "babel-loader" }]
      },
      plugins: [
        new CleanWebpackPlugin([paths.dist], {
          allowExternal: true
        }),
        new HtmlWebpackPlugin({
          template: path.resolve(paths.template, template.entry.html)
        })
      ],
      resolve: {
        alias: {
          data: paths.data
        }
      }
    };

    const modeRunner = require(path.resolve(__dirname, mode));
    modeRunner(webpackConfig, paths);
  }
};
