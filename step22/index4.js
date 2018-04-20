//这个代码由于node不存在这部分内容，需要运行在浏览器里面、
//浏览器js包含XHLHttpRequest
function getUrl(url){
	return new Promise(function(resolve,reject){
		var req = new XHLHttpRequest();
		req.open('GET',url,true);
		req.onload = function(){
			if(req.status == 200){
				resolve(req.responseText);
			}else{
				reject(new Error(req.statusText));
			}
		}
		req.onerror = function(){
			reject(new Error(req.statusText));
		}
		req.send();
	});
}

var url = "http://httpbin.org/get";

getUrl(url).then(function onFulfilled(value){
	console.log(value)
}).catch(function onRejected(error){
	console.log(error)
})