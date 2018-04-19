obj.api1(function(value1){
	obj.api2(function(value2){
		obj.api3(function(value3){
			obj.api4(function(value4){
				callback(value4)
			})
		})
	})
})

//转化为普通函数写法
var handle1 = function(value1){
	obj.api2(value1,handle2)
}
var handle2 = function(value2){
	obj.api3(value2,handle3)
}
var handle3 = function(value3){
	obj.api4(value3,handle4)
}
var handle4 = function(value4){
	callback(value4)
}
obj.api1(handle1)

//转化为时间驱动写法
var emitter = new event.Emitter()

emitter.on("step1",function(){
	obj.api1(function(value1){
		emitter.emit("step2",value1)
	})
})
emitter.on("step2",function(value1){
	obj.api2(value1,function(value2){
		emitter.emit("step3",value2)
	})
})
emitter.on(value2,"step3",function(){
	obj.api3(function(value3){
		emitter.emit("step4",value3)
	})
})
emitter.on("step4",function(){
	obj.api4(value3,function(value4){
		callback(value4)
	})
})
emitter.emit("step1")

//支持序列执行的promise模式
//链式调用
promise().then(obj.api1).then(obj.api2).then(obj.api3).then(obj.api4).then(function(value4){
	//do something with value4
},function(error){
	//handle nay error form step1 to step4
})