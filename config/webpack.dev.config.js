var path = require('path')
var webpack = require('webpack')

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        index: [
            'babel-polyfill',
            './src/index.js',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true'
        ]
    },
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/dist/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=192&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules&sourceMap&localIdentName=[local]-[hash:base64:16]' // css模块化，定制类名
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        options: {
                            modules: true, // 改为true即可支持less模块化
                            sourceMap: false,
                            localIdentName: '[local]-[hash:8]'
                        }
                    }, {
                        loader: 'less-loader',
                        options: {
                            noIeCompat: true,
                            sourceMap: true
                        }
                    }
                ]
            }, {
                enforce: 'pre',
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.js$|\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            'src': path.resolve(__dirname, '../src')
        }
    }
}
