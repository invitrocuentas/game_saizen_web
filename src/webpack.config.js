const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: "./js/index.js", // Ruta de tu archivo principal
  output: {
    path: path.resolve(__dirname, "../dist"), // Carpeta de salida para los archivos generados
    filename: "bundle.js?v1.4", // Nombre del archivo generado
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Identifica archivos .js para aplicar el loader
        exclude: /node_modules/, // Excluir la carpeta node_modules
        use: {
          loader: "babel-loader", // Utilizar Babel para transpilar ES modules a ES5
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource', // Usa file-loader
      },
    ],
  },
  devServer: {
    output: {
      path: path.resolve(__dirname, "dist"),
    },
  },
  plugins: [
    //extrae en un archivo independiente el css
    new MiniCssExtractPlugin({
      filename: "bundle.css?v1.4", // Nombre del archivo CSS generado
    }),
    new TerserPlugin({
      terserOptions: {
        format: {
          comments: false, // Elimina todos los comentarios
        },
      },
    }),
  ],
  optimization: {
    minimize: true, // Habilita la minificación de JS (opcional)
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
        },
      }), // Habilita la minificación de CSS
    ],
  },
  // stats: {
  //   errorDetails: true,
  // },
};
