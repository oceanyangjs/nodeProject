class App{
	constructor(){

	}

	initServer(request,response){
		response.end('aaaa')
	}
}


module.exports = App


//以下写法等价

// var App = function(){

// }

// App.prototype.initServer = function(request,response){

// }

// module.exports = App
