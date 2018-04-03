//继承
var events = require('events');
var util=require('util');

function Stream(){
	events.EventEmitter.call(this);
}

util.inherits(Stream,events.EventEmitter);

Stream.prototype.write = function(data) {
    this.emit("data", data);
}

var stream = new Stream();

console.log(stream instanceof events.EventEmitter); // true
console.log(Stream.super_ === events.EventEmitter); // true

stream.on("data", function(data) {
    console.log('Received data: "' + data + '"');
})
stream.write("It works!"); // Received data: "It works!"



// var classA = require("./classa");

// function classB() {
//     classA.call(this);
// }

// util.inherits(classB, classA);
// classB.prototype.fun = function() {

// };

// exports = module.exports = classB;