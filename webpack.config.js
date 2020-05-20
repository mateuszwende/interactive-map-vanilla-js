const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env, argv) => {
  const mode = argv["mode"] ? argv["mode"] : "development";
  const isDevMode = mode !== "production";
  return {
    mode: mode,
    entry: "./src/index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDevMode ? true : false,
              },
            },
            "css-loader",
            "resolve-url-loader",
            {
              loader: "sass-loader",
              options: { sourceMap: true },
            },
          ],
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ["file-loader"],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: "file-loader",
        },
      ],
    },
    devServer: {
      contentBase: "./dist",
    },
    devtool: "inline-source-map",
    optimization: {
      minimize: isDevMode ? false : true,
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
      new Dotenv(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "Interactive map js",
        template: "./src/templates/main.html",
        favicon: "./src/assets/images/favicon.svg",
      }),
      new MiniCssExtractPlugin({
        filename: isDevMode ? "[name].css" : "[name].[hash].css",
      }),
    ],
  };
};
