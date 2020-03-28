// //读流
// var fs = require('fs');
// var data = '';

// var readerStream = fs.createReadStream('input.txt');

// readerStream.setEncoding('UTF8');

// readerStream.on('data',function(chunk){
//     data+=chunk;
//     console.log(data);
// })

// readerStream.on('end',function(){
//     console.log(data);
// })

// readerStream.on('error',function(err){
//     console.log(err.stack);
// })
// console.log('执行完毕');

// // 写入流
// var fs = require('fs');

// var data = '写入流文件';

// var whiteStream = fs.createWriteStream('output.txt');
// whiteStream.write(data,'UTF8');

// whiteStream.end();

// whiteStream.on('finish',function(){
//     console.log('写入完成');

// })
// whiteStream.on('error',function (err) {
//     console.log(err.stack)
// })


// 链式流
// var fs = require("fs");
// var zlib = require('zlib');

// // 压缩 input.txt 文件为 input.txt.gz
// fs.createReadStream('output.txt')
//   .pipe(zlib.createGzip())
//   .pipe(fs.createWriteStream('output.txt.gz'));
  
// console.log("文件压缩完成。");

// var fs = require('fs');
// var zlib1 = require('zlib');

// fs.createReadStream("output.txt.gz").pipe(zlib1.createGunzip())
//     .pipe(fs.createWriteStream('input.txt'));

// console.log('文件解压完成')

// var fs = require('fs');
// var buf = new Buffer.alloc(1024);

// console.log('准备打开已存在的问价');

// fs.open('input.txt','r+',function (err,fd) {
//     if(err){
//         return console.error(err)
//     }
//     console.log('文件打开成功');
//     console.log('准备读取文件');

//     fs.ftruncate(fd,1,function (err) {
//         if(err){
//             console.log(err);
//         }
//         console.log('文件截取成功');
//         fs.read(fd,buf,0,buf.length,0,function (err,bytes) {
//             if(err){
//                 console.log(err)
//             }
//             console.log(bytes + '位被读取')
//             if(bytes > 0){
//                 console.log(buf.slice(0,bytes).toString())
//             }
    
//             // 关闭文件
//             fs.close(fd, function(err){
//                 if (err){
//                 console.log(err);
//                 } 
//                 console.log("文件关闭成功");
//             });
//         })
//     })
    
// })




var fs = require("fs");
var buf = new Buffer.alloc(1024);

console.log("准备打开文件！");
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("文件打开成功！");
   console.log("截取10字节内的文件内容，超出部分将被去除。");
   
   // 截取文件
   fs.ftruncate(fd, 10, function(err){
      if (err){
         console.log(err);
      } 
      console.log("文件截取成功。");
      console.log("读取相同的文件"); 
      fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
         if (err){
            console.log(err);
         }

         // 仅输出读取的字节
         if(bytes > 0){
            console.log(buf.slice(0, bytes).toString());
         }

         // 关闭文件
         fs.close(fd, function(err){
            if (err){
               console.log(err);
            } 
            console.log("文件关闭成功！");
         });
      });
   });
});

fs.unlink('input.txt', function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("文件删除成功！");
 });


 fs.mkdir('/mkdir.txt',function (err) {
     if(err){
         return console.log(err)
     }
     console.log('创建目录成功')
 });

 