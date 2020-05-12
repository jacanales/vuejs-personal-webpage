var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    publicPath:'',
    configureWebpack: {
        mode: 'production',
        plugins: [
            new HtmlWebpackPlugin({
                hash: true,
                filename: './dist/index.html' //relative to root of the application
            })
       ]
   }
}