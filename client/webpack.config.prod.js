const webpack = require('webpack'),
  { resolve } = require('path'),
  HTMLWebpackPlugin = require('html-webpack-plugin'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const dotenv = require('dotenv')

// Set the path parameter in the dotenv config
const EnvFile = dotenv.config({
  path: './.env'
}).parsed;

// reduce it to a nice object, the same as before (but with the variables from the file)
const EnvKeys = Object.keys(EnvFile).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(EnvFile[next])
  return prev
}, {})

module.exports = {
  mode: 'production',
  entry: {
    main: resolve(__dirname, 'src', 'index.js')
  },
  output: {
    path: resolve(__dirname, '..', 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|ttf|svg|woff|eot)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 15360,
            name: '[path][name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin(EnvKeys),
    new LodashModuleReplacementPlugin,
    new HTMLWebpackPlugin({
      filename: 'index.html',
      favicon: "./src/assets/img/favicon.ico",
      inject: true,
      template: resolve(__dirname, 'src', 'index.html')
    })
  ]
}