const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Webpack = require("webpack");
 

module.exports = {
  entry: './src/js/index.ts',
  output: {
    /*
    filename: 指定打包之后的JS文件的名称
    * */
    filename: "js/bundle.js",
    /*
    path: 指定打包之后的文件存储到什么地方
    * */
    path: path.resolve(__dirname, "bundle")
},
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins:[
    new HtmlWebpackPlugin({
        template:'./src/index.html'
    }),
    new CleanWebpackPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{
        from: './src/lib',
        to: './lib'
    }])
    ]  ,
     devServer:{
    // contentBase:path.join(__dirname,'.'),
    contentBase: "./bundle", //  
    open:false,
    port: 9090,
    hot: true, // 开启热更新, 只要开启了热更新就不会自动刷新网页了
    hotOnly: true // 哪怕不支持热更新也不要刷新网页
}
};