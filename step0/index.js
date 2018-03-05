var http = require('http');

var server = http.createServer(function(req,res){
	res.setHeader('Content-Type','text/html')
	res.writeHead(200,'haha')
	res.write('<html><head><meta charset="utf-8" /> </head>')
	res.write('<body>')
	res.write('<h1>你好nodejs</h1>')
	res.write('</body>')
	res.write('</html>')

	res.end();
})

console.log("open http://localhost:8888")
server.listen(8888);