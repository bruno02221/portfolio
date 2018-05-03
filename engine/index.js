const path = require("path");
const bundler = require("./bundler");

// TODO: use some kind of arguments parser instead of hard coding.

function normalizeMode(mode) {
  switch (true) {
    case /^dev/.test(mode):
      return "dev";
    case /^prod/.test(mode):
      return "prod";
  }
}

const mode = normalizeMode(process.argv[2].replace("--", ""));
const dataPath = process.argv[3].replace("--data=", "");
const templatePath = process.argv[4].replace("--template=", "");

const paths = {
  root: path.resolve("."),
  engine: path.resolve("./engine"),
  data: path.resolve(".", dataPath),
  template: path.resolve(".", templatePath),
  dist: path.resolve(".", "dist")
};

bundler.build({ mode, paths });
