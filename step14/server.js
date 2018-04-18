var http = require("http")
var server = http.createServer(function(req,res){
	res.writeHead(200,{"Content-type":"text/plain"})
	res.end("hello world \n");
}).listen(12010)

server.on('update',function(req,socket,upgradeHead){
	var head = new 
})