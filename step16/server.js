var http = require('http')

http.createServer(function(req,res){
	res.writeHead(200,{'Content-type':'text/plain'})
	res.end("hello world\n")
}).listen(Math.round((Math.random()+1)*1000),'127.0.0.1')
//}).listen(8888,'127.0.0.1')