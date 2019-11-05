const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const main = {
  target: 'electron-main',
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
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
  }
};

const renderer = {
  target: 'electron-renderer',
  entry: './src/assets/script/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/assets/script')
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
        }
      ]
    )
  ]
};

module.exports = [
  main, renderer
];
