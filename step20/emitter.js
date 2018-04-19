"use strict";  
  
const events = require('events');  
var emitter=new events.EventEmitter();  
  
process.nextTick(function(){  
    console.log('nextTick的执行');  
    emitter.emit("done");  
});  
process.nextTick(function(){  
    console.log('nextTick的执行');  
    emitter.emit("done");  
});  
process.nextTick(function(){  
    console.log('nextTick的执行');  
    emitter.emit("done");  
});  
  
var count=0;  
  
var done=function(){  
    count++;  
    if(count===3){  
        console.log('done1:全部异步IO完成');  
    }  
}  
var done2=function(){  
    if(count===3){  
        console.log('done2:全部异步IO完成');  
    }  
}  
emitter.on('done',done);  
emitter.on('done',done2);  