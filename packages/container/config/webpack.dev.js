const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common.js");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    // filename: "[name].[contenthash].js",
    publicPath: "http://localhost:8080/",
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    // this is for generating the index.html file in the dist folder, and it will automatically inject the script tag for the bundle.js file
    // new htmlWebpackPlugin({ // *********** will be removed to common config, because it will be used in both dev and prod
    //   template: "./public/index.html",
    // }),
    // this is for module federation, it will expose the MarketingApp component to other applications
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
        auth: "auth@http://localhost:8082/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
