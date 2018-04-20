//查看执行顺序
var promise = new Promise(function(resolve,reject){
	console.log("inner promise");
	resolve(42);
})

promise.then(function(value){
	console.log(value);
})

console.log("outer promise");