var  http = require("http");
var search_server = require("./solr_server.js");
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./client/data/config.json');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname + "/client"));

var server = app.listen(config.server_port,config.server_host, function () {

	  var host = server.address().address;
	  var port = server.address().port;

	  console.log('fcc search app listening at http://%s:%s', host, port);

	});

process.on('uncaughtException', function (err) {
    console.log(err);
});

app.get('/search', function(req, res){

	search_server.solr_request(req,res);
});

module.exports = app;
