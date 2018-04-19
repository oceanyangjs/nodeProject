//事件队列，once
var proxy = new events.EventEmitter()
var status = "ready"

var select = function(callback){
	//将所有时间压入事件队列，每执行一次就移除监视器
	proxy.once("selected",callback)
	if(status == "ready"){
		status = "pending"
		db.select("SQL",function(results){
			proxy.emit("selected",results)
			status = "ready"
		})
	}
}