// Generated using webpack-cli https://github.com/webpack/webpack-cli

// CommonJS vs ESM https://stackoverflow.com/questions/48168601/change-the-value-of-imported-variable-in-es6

// This is CommonJS
const path = require('path');
// ESM
// > npm install @types/node --save-dev
// import * as path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// CommonJS
const HtmlWebpackPlugin = require('html-webpack-plugin');
// ESM
// import * as PkgHtmlWebpackPlugin from 'html-webpack-plugin';
// const HtmlWebpackPlugin = PkgHtmlWebpackPlugin;

// CommonJS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// ESM
//import * as PkgMiniCssExtractPlugin from 'mini-css-extract-plugin';
//const MiniCssExtractPlugin = PkgMiniCssExtractPlugin;

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';



const config = {
    // Set your entry point
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(new MiniCssExtractPlugin());
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
