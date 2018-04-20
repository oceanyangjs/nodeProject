var promise = new Promise(function(resolve,reject){
	resolve(42);
})
promise.then(function(value){
	console.log(value)
}).catch(function(error){
	console.log(error)
})