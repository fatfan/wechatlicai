var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var entre = {};
require("babel-core").transform("code", {
  plugins: ["transform-class-properties"]
});

module.exports = {
	entry:{"index":['./src/index.js','webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true']},
	output:{
		path:__dirname+"/build",
		publicPath:'/build/',
		filename:"[name].js"
	},
	module:{
		rules:[{
			test:/\.css$/,
			loader:'css-loader'
		},
		{
			test:/\.less$/,
			loader:['css-loader','less-loader']
		},
		{
			test:/\.vue$/,
			loader:"vue-loader"
		},
		{
			test: /\.js$|\.jsx$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015','react','stage-0']
            }
		}]
	},
	plugins: [
	  new webpack.HotModuleReplacementPlugin(),
	  new webpack.NoEmitOnErrorsPlugin()
	],
	resolve: {
	  extensions: ['.vue','.js','.jsx', '.json', ' '],
	}
}






