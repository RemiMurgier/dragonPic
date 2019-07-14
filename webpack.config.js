const webpack = require('webpack');
const path = require('path');

const AutoDllPlugin = require('autodll-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

var APP_DIR = path.resolve(__dirname, 'src');
var BUILD_DIR = path.resolve(__dirname, 'build/javascripts');
var NODE_DIR = path.resolve(__dirname, 'node_modules');
var CSS_DIR = path.resolve(__dirname, 'build/stylesheets');


module.exports = {
	entry: {
		index: [APP_DIR + '/index.jsx']

	},
	output: {
		path: BUILD_DIR,
		filename: '[name].bundle.js',
		publicPath: '/'
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'build'),
		publicPath: '/javascripts/',
		historyApiFallback: true,
		watchContentBase: true,
		compress: true,
		port: 3000,
		open: true,
		overlay: true,
		proxy: {
			// '/': 'http://localhost:3192',  yeah this work too !! xD
			context: ['/api', '/services'],
			target: 'http://localhost:3192',
		}
	  },

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: NODE_DIR,
				loader: 'babel-loader',
				//options replaces babel config file
				options: {
					presets: [
						['@babel/preset-env', {
						//   debug: true,
						  useBuiltIns: 'usage',
						  corejs: 3,
						}],
						['@babel/preset-react'],
					],
					plugins: [
						'@babel/plugin-proposal-class-properties'
					]
				}
			},
			{
				test: /\.(scss|css)$/,
			use: [MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders:1,
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					},
				],
			},
			{ 
				test: /\.(png|jpe?g|woff|woff2|eot|ttf|svg)$/, 
				loader: 'url-loader',
				options: {
					limit: '100000',
				}
			},
		]
	},

	plugins: [
		new UglifyJSPlugin({parallel: true}), 
		new MiniCssExtractPlugin({
			filename: "../stylesheets/style.css",
			chunkFilename: "[id].css",
			path:  CSS_DIR 
		}),
		new HtmlWebpackPlugin({
			inject: true,
			template: './src/index.html',
			filename: path.resolve(__dirname, './build/index.html')
		}),
		new AutoDllPlugin({
			inject: true, // will inject the DLL bundles to index.html
			path: '../javascripts',
			filename: '[name].js',
			entry: {
			  vendor: [
				'@material-ui/core',
				'@material-ui/icons',
				'@material-ui/lab',
				'classnames',
				'history',
				'moment',
				'react',
				'react-dom',
				'react-router-dom',
				'prop-types',
			  ]
			}
		  })
	]
};