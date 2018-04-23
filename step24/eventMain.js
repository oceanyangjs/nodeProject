var events = require("events");
var eventEmitter = new events.EventEmitter();

//监听器
var listener1 = function(){
	console.log('监视器listener1执行')
}

var listener2 = function(){
	console.log('监视器listener2执行')
}

//绑定connection事件
eventEmitter.on('connection',listener1);

eventEmitter.addListener('connection',listener2)

var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection')
console.log(eventListeners + '个监听器监听了连接事件')

//处理connection事件
eventEmitter.emit('connection');

//移除监听绑定的Listener事件
eventEmitter.removeListener('connection',listener1)
console.log('监听器1不再进行监听')

//触发连接事件
eventEmitter.emit('connection');


eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + '个监听器监听了连接事件')

console.log('程序执行完毕')