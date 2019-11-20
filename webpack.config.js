const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const fs = require("fs-extra");

const directories = fs.readdirSync(path.resolve('./src'));


function getEntries(directories) {
  const entry = {};
  for(let i = 0; i < directories.length; i++) {
    const name = directories[i];
    entry[name] = path.resolve("./src", name, 'index.ts')
  }
  return entry
}

function getPlugins(directories) {
  const plugins = [];

  for(let i = 0; i < directories.length; i++) {
    const name = directories[i];
    const option = {
      filename: name + '.html',
      template: path.resolve("./src", name, "index.html"),
      chunks: [name]
    }
    plugins.push(new HtmlWebpackPlugin(option))
  }
  return plugins
}

module.exports = {
  entry: getEntries(directories),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: getPlugins(directories)
}
