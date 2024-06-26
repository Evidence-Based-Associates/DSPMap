const path = require("path");

const pageNames = [
  "csu",
  "language",
  "locality",
  "provider",
  "search",
  "service",
];

const entries = pageNames.reduce((entryObj, pageName) => {
  entryObj[`pages/${pageName}/bundle`] = `./src/pages/${pageName}/index.js`;
  return entryObj;
}, {});

entries["index"] = "./src/index.js";

console.log(entries);

module.exports = {
  mode: "development",
  entry: {
    ...entries,
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./docs",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "docs"),
  },
};
