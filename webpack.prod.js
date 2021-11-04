const HTMLWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const CSSMinimizer = require('css-minimizer-webpack-plugin');
const Teser = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    clean: true,
    filename: 'main.[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          minimize: false,
          sources: false,
        },
      },
      {
        test: /\.css$/,
        exclude: /style.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /style.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CSSMinimizer(), new Teser()],
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: './src/index.html',
      //   filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name][fullhash].css',
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/assets/', to: 'assets/' }],
    }),
  ],
};
