const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');

module.exports = {
    mode: 'production',
    entry: './dist/main.bundle.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'vendor.bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'html模板输出',
            filename: 'index.html',
            template: './index.html'
        }),
        new MergeIntoSingleFilePlugin({
            files: {
                "vendor.bundle.min.js": [
                    'dist/*.js'
                ]
            }
        })
    ]
}


