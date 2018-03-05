var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')

var routes = {
	'/a':function(req,res){
		res.end('match /a . query is ' + JSON.stringify(req.query))
	},
	'/b':function(req,res){
		res.end('match /b')
	},
	'/search':function(req,res){
		res.end('match /search' + 'username=' + req.body.username + 'password=' + req.body.password)
	}
}

function staticRoot(staticPath,req,res){
	var pathObj = url.parse(req.url,true)

	if(pathObj.pathname == "/"){
		pathObj.pathname += "index.html"
	}

	var filePath = path.join(staticPath,pathObj.pathname)

	fs.readFile(filePath,'binary',function(err,fileContent){
		if(err){
			console.log(404)
			res.writeHead(404,'not found')
			res.write('<h1>404 not found</h1>')
			res.end()
		}else{
			console.log('OK')
			res.write(fileContent,'binary')
			res.end()
		}
	})

	//var fileContent = fs.readFileSync(filePath,'binary')
	// res.write(fileContent,'binary')
	// res.end()
}

function routePath(req,res){
	var pathObj = url.parse(req.url,true)

	var handleFn = routes[pathObj.pathname]
	console.log(pathObj.pathname)
	console.log(handleFn)

	if(handleFn){
		req.query = pathObj.query;
		//console.log(req)
		var body = ''
		req.on('data',function(chunk){
			body += chunk
		}).on('end',function(){
			req.body = parseBody(body)
			//console.log("查看数据" + body.toString())
			//console.log(JSON.parse(body.toString()))
			handleFn(req,res)
		})
	}else{
		staticRoot(path.join(__dirname,'static'),req,res)
	}
}

function parseBody(body){	
	var obj = {}
	body.split("&").forEach(function(str){
		obj[str.split("=")[0]] = str.split("=")[1]
	})
	console.dir(obj)
	return obj
}

var server = http.createServer(function(req,res){
	routePath(req,res)
})

server.listen(8080)
console.log("visit http://localhost:8080")