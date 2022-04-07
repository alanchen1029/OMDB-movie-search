const {merge} = require("webpack-merge");
const common = require("./webpack.config.js");
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "..", "build"),
    filename: "bundle.js",
    assetModuleFilename: "assets/[hash][ext][query]",
    publicPath: "/",
    clean: true,
  },
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 8080,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "./src/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
    new webpack.DefinePlugin({
      API_KEY: JSON.stringify("3e16d23c"),
      BASE_URL: JSON.stringify("http://www.omdbapi.com/"),
    }),
  ],
});
