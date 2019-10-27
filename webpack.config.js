const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    extensions: ['.js', '.styl']
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../../assets/css/[name].css"
    })
  ]
};

module.exports = [
  main, renderer
];
