num = 0;
var events = require('events');
var proxy = new events.EventEmitter();
var status = "ready";
var select = function(callback){
    proxy.once("selected", callback);
    if (status === 'ready') {
        status = "pending";
        setTimeout(function() {
            num++;
            status = "ready";
            proxy.emit("selected","test");
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
 test2
 test3
 1
 */