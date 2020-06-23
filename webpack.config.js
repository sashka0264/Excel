/*
Все плагины можно найти по адресу 'webpack.js.org/plugins'
---
'clean-webpack-plugin' - перед каждой сборкой удаляет все файлы из output.path
'html-webpack-plugin' - генерирует при сборке html файл с подключенным к нему 
output.filename
'copy-webpack-plugin' - копирует все указанные файлы
'mini-css-extract-plugin' выносит все импортированные css-файлы в 
1 отдельный файл
*/

const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const fileName = (ext) => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`; 

console.log(isProd ? 'PRODUCTION BUILD' : 'DEVELOPER BUILD');

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
      }
    }
  ];

  if (isDev) {
    loaders.push['eslint-loader'];
  }

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: fileName('js'), 
    // чтобы браузер не кэшировал bundle.js благодаря уникальному [hash], 
    // который будет сгенерирован
    path: path.resolve(__dirname, 'dist')
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 3000, 
    hot: isDev
  },
  resolve: {
    extensions: ['.js'],
    alias: { // для сокращения путей
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html', // так можно указать исходник для html файла
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd // удаление лишних пробелов
      }
    }),
    new CopyPlugin([
      { 
        from: path.resolve(__dirname, 'src/favicon.ico'), 
        to: path.resolve(__dirname, 'dist')
      }
    ]),
    new MiniCssExtractPlugin({
      filename: fileName('css')
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i, // указываем, что тестируем .sass или .scss 
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader', // [2] translates CSS into CommonJS
          'sass-loader' // [1] sass to css
        ]
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        use: jsLoaders()
      }
    ]
  }
};