var num = 0;
var select = function (callback) {
    setTimeout(function() {
        num++;
        callback("test");
    },2000)
}

select(function(res) {
    console.log(res+1);
});

select(function(res) {
    console.log(res+2);
});

select(function(res) {
    console.log(res+3);
});

setTimeout(function() {
   console.log(num);
},5000);
/* 结果
test1
test2
test3
3
*/