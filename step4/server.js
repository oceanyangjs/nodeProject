var http = require('http')
var fs = require('fs')

var server = http.createServer(function(req,res){
	fs.readFile('index.html','utf-8',function(err,data){
		res.end(data);
	})
})

server.listen(8080);