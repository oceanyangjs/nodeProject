num = 0;
var status = "ready";
var select = function(callback){
    if (status === 'ready') {
        status = "pending";
        setTimeout(function() {
            num++;
            status = "ready";
            callback("test");
        })
    }
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
 1
 */
