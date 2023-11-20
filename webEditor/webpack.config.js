const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true,
        library: {
            name: "monaco",
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
        new MonacoWebpackPlugin({
            languages: ['typescript', 'sql', 'javascript', 'css']
        }),
        new HtmlWebpackPlugin({
            title: 'html模板输出',
            filename: 'index.html',
            template: './index.html'
        })
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


