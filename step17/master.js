var fork = require('child_process').fork;
var cpus = require('os').cpus()//获取一个数组，数组中每个元素是CPU的每个核心

var server = require('net').createServer();
server.listen(1337)

//重启次数
var limit = 10;
//时间单位
var during = 5000;
var length = 0;
var restart = []
var isToolFrequently = function(){
	//记录重启时间
	var time = Date.now();
	length = restart.push(time);
	if(length > limit){
		//取最后10条记录
		restart = restart.slice(limit*-1);
	}
	//最后一次重启到前10次重启的时间间隔
	return restart.length >= limit && restart[restart.length-1]-restart[0]<during
}

var workers = {};
var createWorker = function(){
	//检查是否创建进程太过于频繁
	if(isToolFrequently()){
		//出发giveup事件，不再进行重启
		process.emit('giveup',length,during)
		return
	}
	var worker = fork(__dirname + '/worker.js');
	//修改为在退出进程前创建新进程
	//不影响连接在进程上的用户，提高程序健壮性
	//退出时重新启动新的进程
	worker.on('message',function(message){
		if(message.act == 'suicide'){
			createWorker()
		}
	})
	//退出时重新启动新的进程
	worker.on('exit',function(){
		console.log('worker' + worker.pid + 'exited\n');
		delete workers[worker.pid];
		//createWorker()
	})
	//句柄转发
	worker.send('server',server)
	workers[worker.pid] = worker
	console.log('create worker.pid ' + worker.pid + '\n')
}

for(var i = 0;i < cpus.length;i++){
	createWorker();//每个cpu核心创建一个子进程
}
//console.log(workers)//所有进程的信息
//进程自己退出时，所有进程都退出
process.on('exit',function(){
	for(var pid in workers){
		workers[pid].kill();
	}
})