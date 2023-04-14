const Dotenv = require('dotenv-webpack');

module.exports = { 
    mode: 'development',
    // eval-source-map - Each module is executed with eval() and a SourceMap 
    // is added as a DataUrl to the eval(). Initially it is slow, but it provides 
    // fast rebuild speed and yields real files. Line numbers are correctly mapped 
    // since it gets mapped to the original code. 
    // It yields the best quality SourceMaps for development.
    devtool: 'eval-source-map',
    plugins: [
        new Dotenv({
            path: './.env.development',
        })
    ],
} 