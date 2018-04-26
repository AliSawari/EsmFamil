module.exports = {
  entry: `${__dirname}/test.js`,
  output: {
    path: __dirname,
    filename: "./bundle.test.js"
  },
  resolve: {
    extensions:[".js",".jsx"]
  },
  module: {
    rules: [
      {
       exclude: /(node_modules)/,
       use: ['babel-loader']
      }
    ]
  }
}
