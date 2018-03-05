var http = require('http')
var url = require('url')
var fs = require('fs')
var qs = require('querystring')

var server = http.createServer();

var HtmlDir = __dirname + '/html';
server.on('request',function(req,res){
	//console.dir(url.parse(req.url))
	switch(url.parse(req.url).pathname){
		case '/':
			res.write('<h1>我是首页</h1>')
			res.end();
			break;
		case '/index.html':
			sendData(HtmlDir + '/index.html',req,res);
			break;
		case '/login':
			sendData(HtmlDir + '/login.html',req,res)
			break;
		case '/login/check':
			//sendData(HtmlDir + '/login.html',req,res)
			// console.log(url.parse(req.url))
			// console.log(req.method)
			console.log(qs.parse(url.parse(req.url).query))
			break;
		case '/login/checkpost':
			//sendData(HtmlDir + '/login.html',req,res)
			// console.log(url.parse(req.url))
			console.log(req.method)
			var body = '';
			req.on('data',function(chunk){
				body += chunk;
			})
			req.on('end',function(){
				console.log(qs.parse(body))
			})
			break;
	}
})

function sendData(file,req,res){
	fs.readFile(file,function(err,data){
		if(err){
			res.writeHead(404,{
				'content-type':'text/html;charset=utf-8'
			})
			res.end();
		}else{
			res.writeHead(200,{
				'content-type':'text/html;charset=utf-8'
			})
			res.end(data);
		}
	})
}

server.listen(8081,'localhost')