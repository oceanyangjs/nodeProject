//cluster的用法
// var cluster = require('cluster')

// cluster.setupMaster({
// 	exec:"worker.js"
// })

// var cpus = require('os').cpus()
// for (var i = 0; i < cpus.length; i++) {
// 	cluster.fork();
// }

var cluster = require('cluster')
var http = require('http')
var numCpus = require('os').cpus().length

if(cluster.isMaster){
	//fork master
	console.log(`主进程 ${process.pid} 正在运行`);
	for(var i = 0;i < numCpus ; i++){
		cluster.fork();
	}

	cluster.on('exit',function(worker,code,signal){
		console.log('worker' + worker.process.pid + 'died')
	})
}else{
	//工作进程可以共享任何tcp连接
	//在本例子中，共享的是一个http服务器
	http.createServer(function(req,res){
		res.writeHead(200,{'Content-type':'text/plain'})
		res.end('hello world')
	}).listen(8000)

	console.log('process ' + process.pid + ' started')
}