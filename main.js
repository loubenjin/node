// var fs = require('fs');

// var data = fs.readFileSync('input.txt');
// console.log(data.toString());

// // 时间循环

// var events = require('events');

// var eventEmitter = new events.EventEmitter();

// var connectHandler = function connected(){
//     console.log('链接成功')

//     eventEmitter.emit('data_received')
// }
// eventEmitter.on('connection',connectHandler);

// eventEmitter.on('data_received',function(){
//     console.log('数据接收成功')
// });

// eventEmitter.emit('connection');

// //buffer
// const buf = Buffer.from('runoob','ascii');

// console.log(buf.toString('hex'));

// console.log(buf.toString('base64'));

// const buf1 = Buffer.alloc(10);

// const buf2 = Buffer.alloc(10,1);

// const buf3 = Buffer.allocUnsafe(10);

// const buf4 = Buffer.from([1,2,3]);

// const buf5 = Buffer.from('test');


// console.log(buf1,buf2,buf3,buf4,buf5);

var buf1 = Buffer.from('abcdefghijkl');
var buf2 = Buffer.from('RUNOOB');

//将 buf2 插入到 buf1 指定位置上
buf2.copy(buf1, 2,2,4);

console.log(buf1.toString());

// 裁剪
var buffer_origin = Buffer.from('runoob');
var buffer_slice = buffer_origin.slice(0,2);
console.log("buffer slice content: "+buffer_slice.toString());
console.log("buffer origin content: "+buffer_origin.toString());
buffer_slice.write("wirte"); // Write buffer slice

// 裁剪前与原始字符串的改变
console.log("buffer slice content: "+buffer_slice.toString());
console.log("buffer origin content: "+buffer_origin.toString());