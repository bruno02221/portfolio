const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  build: ({ mode, paths }) => {
    console.log(path.resolve(paths.engine, "modules"));
    const template = require(paths.template);

    const webpackConfig = {
      entry: [path.resolve(paths.template, template.entry.js)],
      output: {
        filename: `${template.name}.js`,
        path: paths.dist,
        publicPath: "/"
      },
      module: {
        rules: [
          { test: /\.js$/, use: "babel-loader" },
          {
            test: /\.(png|jpg)$/,
            use: {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
                outputPath: "images/"
              }
            }
          }
        ]
      },
      plugins: [
        new CleanWebpackPlugin([paths.dist], {
          allowExternal: true
        }),
        new webpack.DefinePlugin({
          DATA_PATH: JSON.stringify(paths.data),
          TEMPLATE_PATH: JSON.stringify(paths.template)
        }),
        new HtmlWebpackPlugin({
          template: path.resolve(paths.template, template.entry.html)
        })
      ],
      resolve: {
        alias: {
          data: path.resolve(paths.engine, "data")
        }
      }
    };

    const modeRunner = require(path.resolve(__dirname, mode));
    modeRunner(webpackConfig, paths);
  }
};
