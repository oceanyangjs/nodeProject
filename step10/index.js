// var http = require('http')

// var bufstr = new Buffer('abcde')
// var options = {
//     		host: 'localhost' 
//     		port: 4150 
//     		path: '/' 
//             data:bufstr 
//     		method: 'POST'
// };
    
// var reqHttps = http.request(options  function(resHttps) {
// 	console.log("statusCode: "  resHttps.statusCode);
// 	console.log("headers: "  resHttps.headers);
	
// 	resHttps.on('data'  function(body1) {
// 	console.log("body:"+body1);
// 	});
// });

var http = require("http");
var qs = require('querystring');

//var postData = {"name": "freddon"  "domain": "http://www.sagosoft.com/"};
var postData = new Buffer('8b76fde713sdfsafdsafasdfsadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddweqrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrsdfaaaaaaaaaaaaaaaaaaaaasdffdsafsadfdasfsfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaace','base64')
console.log(postData)
postData = {"type":"Buffer","data":[22,3,0,0,83,1,0,0,79,3,0,63,71,215,247,186,44,238,234,178,96,126,243,0,253,130,123,185,213,150,200,119,155,230,196,219,60,61,219,111,239,16,110,0,0,40,0,22,0,19,0,10,0,102,0,5,0,4,0,101,0,100,0,99,0,98,0,97,0,96,0,21,0,18,0,9,0,20,0,17,0,8,0,6,0,3,1,0]}
var outData=qs.stringify(postData);
var options = {
    host: '127.0.0.1',
    port: 3010 ,
    path: '/' ,
    //path:'/biz?name=freddon&domain='+encodeURIComponent("http://www.sagosoft.com/") 
    /**
     * 如果改为get，上述的postdata需要自己拆成key＝value格式拼接在path之后
     * 如 '/biz?name=freddon&domain='+encodeURIComponent("http://www.sagosoft.com/")
     */
    method: 'POST' ,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded' ,
        //只有post时，这个才有用
        'Content-Length': outData.length

    }
};

var requestCallback = function (response) {
    response.setEncoding('utf-8');
    console.log("状态码 %d \nheaders:\n %s \n当前的请求方式为【%s】请求",response.statusCode ,
        JSON.stringify(response.headers),options.method);
    var receiveData = "";
    response.on('data', function (chunk) {
        receiveData += chunk;
    }).on('end', function () {
        //打印
        console.log("\n从" + options.host + "获得的数据为：" + receiveData);
    });

};

var req = http.request(options, requestCallback).on('error',function(e){

    console.log(e.message);
});
req.write(outData);//当然如果是get请求 这个写了也没用
req.end();