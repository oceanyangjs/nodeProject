var http = require('http')
var server = http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'})
	res.end('handle by child pid is ' + process.pid + '\n')
	throw new Error('throw exception')
})


var worker;
process.on('message',function(m,tcp){
	if(m == 'server'){
		worker = tcp
		tcp.on('connection',function(socket){
			server.emit('connection',socket)
		})
	}
})

process.on('uncaughtException',function(){
	process.send({act:'suicide'})
	//停止接收新的连接
	worker.close(function(){
		//所有已有连接断开后，退出进程
		process.exit(1);
	})
	//定时强制退出进程，由于长连接退出进程需要一个过程
	//5秒后强制退出
	setTimeout(function(){
		process.exit(1);
	},5000)
}) 