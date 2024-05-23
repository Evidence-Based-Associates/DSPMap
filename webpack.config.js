const path = require("path");

const pageNames = [
  "csu",
  "language",
  "locality",
  "provider",
  "search",
  "service",
];

const entries = pageNames.map((pageName) => {
  return {
    [`pages/${pageName}/bundle`]: `./src/pages/${pageName}/index.js`,
  };
});

console.log(entries);

module.exports = {
  mode: "development",
  entry: {
    "pages/somePage/index": "./src/pages/somePage/index.js",
    "pages/anotherPage/index": "./src/pages/anotherPage/index.js",
    "pages/firebase/index": "./src/pages/firebase/index.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./docs/pages/firebase",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "docs"),
  },
};
