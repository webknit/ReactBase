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
				loader: 'babel-loader'
			}
		]
	}
};