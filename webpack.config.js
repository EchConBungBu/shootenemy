var path = require('path');

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: './dist/bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx', '.css']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        enforce: 'post',
        test: /\.tsx?$/,
        include: path.resolve(__dirname, "node_modules/pixi.js"),
        loader: 'ify'
      },
      {
         test: /\.css$/, 
         loader:  ['style-loader', 'css-loader']
      }
    ]
  },
  externals: [
        // Don't bundle pixi.js, assume it'll be included in the HTML via a script
        // tag, and made available in the global variable PIXI.
        {"pixi.js": "PIXI"}
    ]
}