const { merge } = require("webpack-merge");
const htmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common.js");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    // filename: "[name].[contenthash].js",
    publicPath: "http://localhost:8082/",
  },
  devServer: {
    port: 8082,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    // this is for generating the index.html file in the dist folder, and it will automatically inject the script tag for the bundle.js file
    new htmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // this is for module federation, it will expose the MarketingApp component to other applications
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
