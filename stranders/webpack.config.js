var path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './client/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            { test: /\.js$/, use: "babel-loader" },
            {
                test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(png|jpg|gif|jpeg|ttf)$/,
                type: 'javascript/auto',
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8000
                        }
                    }
                ]
            }
        ]
    },
    target: 'web',
    devServer: { hot: false, watchContentBase: true},
    plugins: [
        new htmlWebpackPlugin({
            template: './client/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ]
};