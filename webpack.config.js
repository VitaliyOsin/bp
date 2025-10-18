const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { CleanPlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  context: path.resolve(__dirname, "src"),
  entry: {
    main: "./main.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[contenthash].js",
  },
  devServer: {
    port: 4435,
    hot: true,
    open: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new CleanPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "pics"),
          to: path.resolve(__dirname, "dist", "pics"),
        },
        {
          from: path.resolve(__dirname, "src", "css"),
          to: path.resolve(__dirname, "dist", "css"),
        },
        {
          from: path.resolve(__dirname, "src", "Manifest.webmanifest"),
          to: path.resolve(__dirname, "dist", "Manifest.webmanifest"),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jpg|.jpeg|.png$/,
        use: ["file-loader"],
      },
    ],
  },
};
