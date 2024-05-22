const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    "pages/somePage/index": "./src/pages/somePage/index.js",
    "pages/anotherPage/index": "./src/pages/anotherPage/index.js",
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
