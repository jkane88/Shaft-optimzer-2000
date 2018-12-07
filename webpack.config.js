const path = require('path');

module.exports = {

    // Source file
    entry: {
        app: './src/app.js'
    },

    // Output file
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },

    // Babel loader
    module: {
        rules: [{
            test: /\.js?$/, /* All javascript files */
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['env']
            }
        }],
    },

    // Build mode: none | development | production
    mode: 'development'
}