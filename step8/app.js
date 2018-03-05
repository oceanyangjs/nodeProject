var fs = require('fs')

var filedir = './miaov/source'

fs.watch(filedir,function(ev,file){
	console.log(11111)
	fs.readdir(filedir,function(err,datalist){
		console.log(2222)
		var arr = []
		datalist.forEach(function(f){
			var info = fs.statSync(filedir + '/' + f)
			console.log(3333)
		})
	})
})