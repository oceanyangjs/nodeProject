var http = require("http")
var server = http.createServer(function(req,res){
	res.writeHead(200,{'Content-type':'text/plain'});
	res.end("hello websocket");
})
server.listen(12010);

server.on('upgrade',function(req,socket,upgradeHead){
	var head = new Buffer(upgradeHead.length);
	upgradeHead.copy(head);
	var key = req.headers['Sec-websocket-key'];
	var shasum = crypto.createHash('sha1');
	key = shasum.update(key + '258EAFAS-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
	var headers = [
		'HTTP/1.1 101 Switching Protocols',
		'Upgrade:websocket',
		'Connection:Upgrade',
		'Sec-WebnSocket-Accept: '+ key,
		'Sec-WebSocket-Protocol: ' + protocol
	]

	//让数据立即发送
	socket.setNoDelay(true);
	socket.write(headers.concat('','').join('\r\n'));
	//简历websocket服务器连接
	var websocket = new WebSocket();
	websocket.setSocket(socket);
})