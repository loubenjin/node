// const util = require('util');
// const Promise = require('promise');

// async function fn() {
//     return  Promise.reject(false);
// }

// const callbackFunction = util.callbackify(fn);

// callbackFunction((err,ret) => {
//     if(err && err.hasOwnProperty('reason') && err.reason === null) throw err;
//     console.log(ret);
// })

// var util = require('util'); 
// function Base() { 
//     this.name = 'base'; 
//     this.base = 1991; 
//     this.sayHello = function() { 
//     console.log('Hello ' + this.name); 
//     }; 
// } 
// Base.prototype.showName = function() { 
//     console.log(this.name);
// }; 
// function Sub() { 
//     this.name = 'sub'; 
// } 
// util.inherits(Sub, Base); 
// var objBase = new Base(); 
// objBase.showName(); 
// objBase.sayHello(); 
// console.log(objBase); 
// var objSub = new Sub(); 
// objSub.showName(); 
// objSub.sayHello(); 
// console.log(objSub); 

var util = require('util');

function Person(params) {
    this.name = 'abc';
    this.toString = function () {
        return this.name;
    }
}

var obj = new Person();

console.log(util.inspect(obj));
console.log(util.inspect(obj,true,1,true));

var  fs = require('fs');

console.log('准备发开文件');

fs.stat('input.txt',function (err,stats) {
    if(err){
        return console.error(err)
    }
    console.log(stats);
    console.log('读取文件信息成功')

    console.log(stats.isFile(),stats.isDirectory())
})

