const path = require("path");

const pageNames = [
  "csu",
  "language",
  "locality",
  "provider",
  "search",
  "service",
  "admin/provider",
];

const entries = pageNames.reduce((entryObj, pageName) => {
  entryObj[`pages/${pageName}/bundle`] = `./src/pages/${pageName}/index.js`;
  return entryObj;
}, {});

entries["index"] = "./src/index.js";

console.log(entries);

module.exports = {
  mode: "production",
  entry: {
    ...entries,
  },
  devServer: {
    static: "./docs",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "docs"),
  },
};
