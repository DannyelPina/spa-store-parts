const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const publicPath = '/';

module.exports = {
    // Entry point, from where all extraction should be made
    entry: './src/index.tsx',
    // Init webpack rules to collect js, jsx, css files
    module: {
        rules: [
            {
                // Extract and Transpile ES6+ in to ES5 
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            // {
            //     test: /\.css$/i,
            //     include: path.resolve(__dirname, '../src/styles'),
            //     use: ['style-loader', 'css-loader', {
            //         loader: "postcss-loader",
            //         options: {
            //           plugins: () => [
            //             require("autoprefixer")()
            //           ],
            //         },
            //       }
            //     ],
            // },
            {
                // Extract CSS files
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                // loader: 'file-loader',
                // options: {
                //     outputPath: 'images',
                // },
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            publicPath: 'images/',
                        },
                    },
                ],
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    // https://webpack.js.org/configuration/output/
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'widget.js',
        chunkFilename: 'widget.chunk.js',
        // Output library name
        library: 'StatsWidget',
        libraryTarget: 'umd',
        publicPath: publicPath,
        libraryExport: 'default'
    },
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        // contentBase: path.join(__dirname, '../dist'),
        hot: true,
        compress: true
    },
    // https://webpack.js.org/configuration/plugins/
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "widget.css",
            chunkFilename: "widget.css"
        })
    ],
    // https://webpack.js.org/configuration/optimization/
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                // sourceMap: true,
                terserOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    }
}