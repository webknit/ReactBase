var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: './app.js',

	output: {
		//path: '../site/scripts/',
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['react-hot', 'babel-loader']
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	}
};