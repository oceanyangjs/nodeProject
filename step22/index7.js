// 这时候如果 Task A 想给 Task B 传递一个参数该怎么办呢？

// 答案非常简单，那就是在 Task A 中 return 的返回值，会在 Task B 执行时传给它。
function doubleUp(value) {
    return value * 2;
}
function increment(value) {
    return value + 1;
}
function output(value) {
    console.log(value);// => (1 + 1) * 2
}

var promise = Promise.resolve(1);
promise
    .then(increment)
    .then(doubleUp)
    .then(output)
    .catch(function(error){
        // promise chain中出现异常的时候会被调用
        console.error(error);
    });