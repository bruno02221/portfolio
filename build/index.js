const path = require("path");

// TODO: use some command line args parser instead of using
// raw reading of the process argv object

// The build type [dev(elopment) or prod(uction)]
const mode = process.argv[2].replace("--", "");

// Configuration object
const configPath = process.argv[3].replace("--config=", "");
const config = require(path.resolve(".", configPath));

// Important application's paths
const paths = {
  root: path.resolve("."),
  build: path.resolve(".", "build"),
  config: path.resolve(".", configPath),
  data: path.resolve(".", configPath, config.dataPath),
  template: path.resolve(".", configPath, config.templatePath),
  dist: path.resolve(".", configPath, config.distPath)
};

// Bundler implementation
const bundlerPath = process.argv[4].replace("--bundler=", "");
const bundler = require(path.resolve(".", bundlerPath));

// Executes the webpack bundler process
bundler({ mode, paths });
