//此处是promise的语法糖，直接用promise的类来进行
// 静态方法Promise.resolve(value) 可以认为是 new
//  Promise() 方法的快捷方式。
Promise.resolve(42).then(function(value){
	console.log(value)
})
// 这段代码的功能是调用该promise对象通过then指定的 onRejected 函数，并将错误（Error）对象传递给这个 onRejected 函数。
Promise.reject(new Error("BOOM!")).catch(function(error){
    console.error(error);
});