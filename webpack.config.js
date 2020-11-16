const path = require('path');

const TARGET_DIR = path.resolve(__dirname, 'target');
const SRC_DIR = path.resolve(__dirname, 'src');

const config = {
  entry: SRC_DIR + '/js/client.ts',
  output: {
    path: TARGET_DIR,
    filename: 'bundle.js'
  },
  node: {
    fs: 'empty',
    __filename: true
  },
  module: {
    rules: [
      // All .ts* files are es-linted.
      /*
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        exclude: /node_modules/,
      }, */
      {
        // Compile .ts and .tsx files
        test: /\.tsx?$/,
        exclude: /node_modules[/\\](?!react-data-grid[/\\]lib)/,
        use: 'ts-loader'
      },
      {
        test: /\.(css|less)$/,
        use: ["style-loader", "css-loader"]
      },
    ]
  },
  resolve: {
    // We want to be able to include .jsx and .tsx modules without explicitly stating the extension JSX.
    extensions: ['*', '.js', '.json', '.jsx', '.ts', '.tsx']
  },
  externals: {
    // In cpexcel.js file (from xlsx-style package), there is a conditional require for cptable module. 
    // It is never used, but webpack tries to bundle it and fails with an error.
    // This is simply to avoid that error
    "./cptable": "cptable"
  },
  devtool: "cheap-module-source-map",
  devServer: {
    port: 58182,
    contentBase: path.join(SRC_DIR, 'assets'),
    historyApiFallback: {
      index: 'index.html'
    },

    // Proxy to forward the API reqests to the authProxy
    proxy: {
      '/api': {
        target: 'http://localhost:58180',
        secure: false
      },
      '/auth': {
        target: 'http://localhost:58181',
        secure: false
      }
    }
  }
};

module.exports = config;