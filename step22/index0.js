function test(){
	console.log(123)
	return new Promise(function(resolve,reject){
		console.log(456)
		var aaa = 12;
		resolve(aaa) // 这行必须有
	})
}


test().then(function(value){
	console.log(value)
})