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
      // Add this new rule for image files
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8192 // 8kb - inline smaller files as data URLs for better performance
          }
        },
        generator: {
          filename: 'images/[name][ext][query]' // Output path for images
        }
      },
      // Add this rule for font files if you're using any
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]' // Output path for fonts
        }
      }
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
  // Add mode to avoid warnings
  mode: 'development', // Change to 'production' for production builds
}
