const { merge } = require("webpack-merge");
const htmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common.js");

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    // this is for generating the index.html file in the dist folder, and it will automatically inject the script tag for the bundle.js file
    new htmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
