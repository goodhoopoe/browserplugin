const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const pluginFolder = "browserplugin";

module.exports = {
  entry: { index: "./src/index.ts", contentScript: "./src/contentScript.ts" },
  output: {
    filename: "[name].js",
    path: `${path.resolve(__dirname, "dist")}/${pluginFolder}`,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: ["ts-loader"],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: "src/static",
      },
    ]),
  ],
  resolve: {
    extensions: [".js", ".ts"],
  },
};
