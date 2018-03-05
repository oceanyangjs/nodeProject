// console.log(__filename)
// console.log(__dirname)
// console.log(process)

//process.stdout.write('11111')

var a;
var b
process.stdout.write('请输入A的值')
//process.stdin.resume();
process.stdin.on('data',function(chunk){
	if(!a){
		a = Number(chunk)
		process.stdout.write('请输入B的值')
	}else{
		b = Number(chunk)
		console.log('a+b = ' + (a+b))
	}
})