const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: './server/server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: '/'
  },
  target: 'node',
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'production'`
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  }
}


// ORIGINAL WEBPACK CONFIG
// const path = require('path');

// module.exports = {
//   mode: 'development',
//   entry: path.join(__dirname, 'client/Header.jsx'),

//   output: {
//     filename: 'static.js',
//     path: path.join(__dirname, '/public')
//   },

//   module: {
//     rules: [
//       {
//         test: /\.jsx?/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env', '@babel/preset-react']
//           },
//         }
//       },

//       {
//         test: /\.css$/,
//         exclude: /node_modules/,
//         use: ['style-loader', 'css-loader'],
//       },
//     ]
//   },

// };


