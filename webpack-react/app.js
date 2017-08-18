var webpack = require('webpack');
var webpackBaseConfig = require('./webpack.config.js');

var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var express = require('express');

var app = express();


app.use(webpackDevMiddleware(webpack(webpackBaseConfig), {
	publicPath: webpackBaseConfig.output.publicPath,
}));

console.log(webpackBaseConfig.output.publicPath)
app.use(webpackHotMiddleware(webpack(webpackBaseConfig)));


app.use('/',express.static(__dirname));

app.listen(3000);
/*var http = require('http');
var server = http.createServer(app);
server.listen(3000, function(){
    console.log('App (dev) is now running on port 3000!');
});*/




