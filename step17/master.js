var fork = require('child_process').fork;
var cpus = require('os').cpus()//获取一个数组，数组中每个元素是CPU的每个核心

var server = require('net').createServer();
server.listen(1337)

var workers = {};
var createWorker = function(){
	var worker = fork(__dirname + '/worker.js');
	//退出时重新启动新的进程
	worker.on('exit',function(){
		console.log('worker' + worker.pid + 'exited\n');
		delete workers[worker.pid];
		createWorker()
	})
	//句柄转发
	worker.send('server',server)
	workers[worker.pid] = worker
	console.log('create worker.pid ' + worker.pid + '\n')
}

for(var i = 0;i < cpus.length;i++){
	createWorker();//每个cpu核心创建一个子进程
}
console.log(workers)//所有进程的信息
//进程自己退出时，所有进程都退出
process.on('exit',function(){
	for(var pid in workers){
		workers[pid].kill();
	}
})