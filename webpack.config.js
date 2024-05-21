const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    "pages/somePage/index": "./src/pages/somePage/index.js",
    "pages/anotherPage/index": "./src/pages/anotherPage/index.js",
  },
  // entry: ["./src/pages/somePage/index.js", "./src/pages/anotherPage/index.js"],
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/pages/somePage/index.html",
      filename: "pages/somePage/index.html",
      chunks: ["pages/somePage/index"],
    }),
    new HtmlWebpackPlugin({
      template: "src/pages/anotherPage/index.html",
      filename: "pages/anotherPage/index.html",
      chunks: ["pages/anotherPage/index"],
    }),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
    ],
  },
};
