const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: { main: "./src/index.js" }, // Входной js-файл
  output: {
    path: path.resolve(__dirname, "dist"), // выходная папка
    filename: "main.js", // выходной js-файл
    publicPath: "",
  },
  mode: "development", // Для разработки
  devServer: {
    static: path.resolve(__dirname, "./dist"), // Сервер смотрит на файлы в этой папке
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Регулярка для .js-файлов
        use: "babel-loader", // Прогоняем их через модуль babel-loader
        exclude: "/node_modules/", // Кроме модулей node
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
