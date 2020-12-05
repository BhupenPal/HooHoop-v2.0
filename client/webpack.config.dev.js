const webpack = require('webpack'),
  { resolve } = require('path'),
  HTMLWebpackPlugin = require('html-webpack-plugin'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const dotenv = require('dotenv')

// Set the path parameter in the dotenv config
const fileEnv = dotenv.config({
  path: './.env'
}).parsed;
  
// reduce it to a nice object, the same as before (but with the variables from the file)
const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(fileEnv[next])
  return prev
}, {})

module.exports = {
  mode: 'development',
  devServer: {
    host: process.env.HOST_IP,
    port: process.env.CLIENT_PORT,
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: './',
    hot: true,
    proxy: {
      '/api': {
        target: `http://${process.env.HOST_IP}:${process.env.PORT}`,
        changeOrigin: true
      }
    }
  },
  entry: {
    main: resolve(__dirname, 'src', 'index.js')
  },
  output: {
    path: resolve(__dirname, '..', 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
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
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin(envKeys),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      favicon: "./src/assets/img/favicon.ico",
      inject: true,
      template: resolve(__dirname, 'src', 'index.html')
    })
  ]
}