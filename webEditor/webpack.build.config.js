const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { StructureDonePlugin } = require('./DefineWebpackPlugins');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: './umd.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true,
        library: {
            name: "MoEditor",
            type: 'umd'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        /**
         * 去掉打包的 LICENSE
         */
        new webpack.IgnorePlugin({
            resourceRegExp: /LICENSE\.txt$/
        }),
        new MonacoWebpackPlugin({
            languages: ['typescript', 'sql', 'javascript', 'css']
        }),
        new HtmlWebpackPlugin({
            title: 'html模板输出',
            filename: 'index.html',
            template: './index.html'
        }),
        new StructureDonePlugin()
    ],
    devServer: {
        port: 3008,
        host: 'localhost',
        static: {
            directory: path.join(__dirname, 'dist'),
            watch: true,
        },
    }
}


