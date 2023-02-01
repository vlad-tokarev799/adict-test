const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['./js/index.js'],
  target: 'web',
  output: {
    filename: './js/bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'src')
    },
    port: 8080,
    compress: true,
    open: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './js'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'group-css-media-queries-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: () => {
            return 'fonts/[name][ext]'
          }
        }
      },
      {
        test: /\.(svg|png|jpg|jpeg|webp)/,
        type: 'asset/resource',
        generator: {
          filename: () => {
            return 'img/[name][ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css'
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'img', to: 'img' }]
    })
  ]
}
