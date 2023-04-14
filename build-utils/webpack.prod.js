const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'production',
    // source-map - A full SourceMap is emitted as a separate file. 
    // It adds a reference comment to the bundle so development tools know where to find it.
    devtool: 'source-map',
    plugins: [
        new Dotenv({
            path: './.env.production',
        })
    ],
}