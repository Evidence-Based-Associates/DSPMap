module.exports = {
  // The entry point file described above
  entry: "./src/initMap.js",
  // The location of the build folder described above
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
  },
  mode: "development",
  devtool: "source-map",
};
