const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const main = {
  target: 'electron-main',
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build')
  },
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: path.resolve(__dirname, 'node_modules')
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        {
          from: 'src',
          to: './',
          ignore: ['!*.env']
        }
      ]
    )
  ]
};

const renderer = {
  target: 'electron-renderer',
  entry: path.join(__dirname, 'src/assets/script/main.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build/assets/script')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../img/',
              publicPath: path => '../img/' + path.basename(path)
            }
          }
        ]
      },
      {
        test: /\.(woff|eot|ttf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../font/',
              publicPath: path => '../font/' + path.basename(path)
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.styl', '.html']
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/[name].css"
    }),
    new CopyWebpackPlugin(
      [
        {
          from: 'src',
          to: '../../',
          ignore: ['!*.html']
        }, {
          from: 'src/assets/img',
          to: '../img'
        }, {
          from: 'src/assets/font',
          to: '../font'
        }
      ]
    )
  ]
};

module.exports = [
  main, renderer
];
