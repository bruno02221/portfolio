const path = require("path");
const bundler = require("./bundler");
const args = require("yargs").argv;

function normalizeMode(mode) {
  switch (true) {
    case /^dev/.test(mode):
      return "dev";
    case /^prod/.test(mode):
      return "prod";
  }
}

const mode = normalizeMode(args.mode);
const dataPath = args.data;
const templatePath = args.template;

const paths = {
  root: path.resolve("."),
  engine: path.resolve("./engine"),
  data: path.resolve(".", dataPath),
  template: path.resolve(".", templatePath),
  dist: path.resolve(".", "dist")
};

bundler.build({ mode, paths });
