var http = require('http')
var urlll = require('url')
var crypto = require('crypto')
var socket = require('socket')
var WebSocket = function(url){
	//伪代码 解析ws://127.0.0.1:12010/updates 用于请求
	this.options = urlll.parse(url);
	this.connect();
}

socket.onopen = function(){
	setInterval(function(){
		if(socket.bufferedAmount ==0){
			socket.send(getUpdateData());
		}		
	},50)
}

socket.onmessage = function(event){
	
}




WebSocket.prototype.onopen = function() {
	// body...
};

WebSocket.prototype.setSocket = function() {
	this.socket = socket;
};

WebSocket.prototype.connect = function() {
	// body...
	//var this = that;
	var that = this;
	var key = new Buffer(that.options.protocolVersion + '-' + Date.now()).toString('base64');
	var shasum = crypto.createHash('sha1');
	var expected = shasum.update(key + '258EAFAS-E914-47DA-95CA-C5AB0DC85B11').digest('base64');

	var options = {
		port:that.options.port,
		host:that.options.hostname,
		headers:{
			'Connection':'Upgrade',
			'Upgrade':'webSocket',
			'Sec-WebSocket-Version':that.options.protocolVersion,
			'Sec-WebSocket-Key':key
		}
	};
	var req = http.request(options);
	req.end();

	req.on('Upgrade',function(){
		that.setSocket(socket);
		that.onopen();
	})
};

var socket = new WebSocket('ws://127.0.0.1:12010/updates')