module.exports = {
  entry: './src/main.js',
  output: {
     filename: './build/bundle.js'
  },
  devtool: 'inline-source-code',
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {name: 'fonts/[name].[ext]'}
        }]
      },
      {
         test: /\.scss$/,
         use: [
           {
             loader: 'style-loader'
           },
           {
             loader: 'css-loader',
             options: {sourceMap: true}
           },
           {
             loader: 'sass-loader'
           }
         ]
        }
   ]
 }
};
