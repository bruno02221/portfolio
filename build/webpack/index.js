const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode, paths }) => {
  // Obtains information about the template
  const template = require(paths.template);

  // Webpack config
  const webpackConfig = {
    mode: mode && mode.startsWith("dev") ? "development" : "production",
    entry: [path.resolve(paths.template, template.entry)],
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
        template: path.resolve(paths.template, template.html)
      })
    ],
    resolve: {
      alias: {
        // Alias the data and template folders so that they can be used
        // inside the application through 'data' and 'template' imports.
        data: paths.data,
        template: paths.template
      }
    }
  };

  // Loads the appropriated environment
  const environment = require(path.resolve(paths.build, "webpack", mode));

  // Applies the environment-related stuff
  if (environment.apply) environment.apply(webpackConfig, paths);
  if (environment.execute) environment.execute(webpackConfig, paths);
};
