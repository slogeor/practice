const path = require('path');

module.exports = {
    mode: 'none',
    entry: './src/index.js',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: path.join(__dirname, './plugin/function-try-catch-plugin.js'),
            // use: [
            //     "babelPluginFunctionTryCatch",
            // ]
        }],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};