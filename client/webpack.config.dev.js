const { resolve } = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  devServer: {
    host: '192.168.1.7',
    port: 8080,
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: './',
    hot: true,
    proxy: {
      '/api': {
        target: '192.168.1.7:3000',
        changeOrigin: true
      }
    }
  },
  entry: {
    main: resolve(__dirname, 'src', 'index.js')
  },
  output: {
    path: resolve(__dirname, 'dist'),
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
        use: [ 'style-loader', 'css-loader', 'sass-loader' ],
      },
      {
        test: /\.(png|jpg|gif|ttf)$/i,
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
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      favicon: "./src/assets/img/favicon.ico",
      inject: true,
      template: resolve(__dirname, 'src', 'index.html')
    })
  ]
}