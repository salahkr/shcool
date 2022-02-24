var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { resolve } = require("path");

module.exports = {

    // المدخل 
    entry: {
        app: './src/index.js'
    },

    // المخرج 
    output: {
        path: path.join(__dirname, "/dist"),
        publicPath: '',
        filename: "main.js"
    },

    // الوضع 
    mode: "development",

    // السيرفر المحلي 
    devServer: {
        static: path.join(__dirname, "/dist"),
        port: 1238,
        devMiddleware: { writeToDisk: true },
        open: true,
    },

    module: {
        rules: [
            // Html Loader
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                        }
                    }
                ]
            },

            // Css Loader
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    'css-loader',
                ]
            },

            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: "images",
                        }
                    }
                ]
            },

            {
                test: require.resolve('jquery'),
                loader: 'expose-loader',
                options: {
                    exposes: ['$', 'jQuery'],
                }
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
        }),

        new MiniCssExtractPlugin({ filename: "css/style.css" }),

        new CssMinimizerPlugin({}),
    ],
};