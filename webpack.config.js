var Webpack = require('webpack');

module.exports = {
    entry: [
        'Webpack-dev-server/client?http://localhost:8080',
        'Webpack/hot/only-dev-server',
        './src/main.js'
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: 'dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './',
        hot: true
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ]
};