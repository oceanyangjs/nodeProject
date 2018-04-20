//解决Promise#catch标识符冲突问题
var promise = Promise.reject(new Error("message"));
promise["catch"](function (error) {
    console.error(error);
});
// 运行
// 或者我们不单纯的使用 catch ，而是使用 then 也是可以避免这个问题的。

// 使用Promise#then代替Promise#catch
var promise = Promise.reject(new Error("message"));
promise.then(undefined, function (error) {
    console.error(error);
});