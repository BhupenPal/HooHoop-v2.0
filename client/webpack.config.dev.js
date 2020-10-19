const webpack = require('webpack'),
  { resolve } = require('path'),
  HTMLWebpackPlugin = require('html-webpack-plugin'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

require('dotenv').config({
  path: '../server/config/.env'
})

// For React Fast Refresh
process.env.NODE_ENV = 'development'

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
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|ttf|svg)$/i,
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
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      favicon: "./src/assets/img/favicon.ico",
      inject: true,
      template: resolve(__dirname, 'src', 'index.html')
    })
  ]
}