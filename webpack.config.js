var path = require('path')

module.exports = {
entry: [
  path.join(__dirname, 'srcjs', 'main.jsx')
],
	output: {
		path: path.join(__dirname, 'inst/www/cc.landing'),
  filename: 'main.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env', '@babel/preset-react'],
				},
			},
			// For CSS so that import "path/style.css"; works
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			// Adding the rule for SCSS files
			{
				test: /\.scss$/,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
		],
	},
	externals: {
		react: 'window.React',
		'react-dom': 'window.ReactDOM',
		reactR: 'window.reactR',
	},
	stats: {
		colors: true,
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.jsx'],
	},
}
