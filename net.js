var net = require('net');

var server = net.createServer(function (connetcion) {
    console.log('client connected');
    connetcion.on('end',function (params) {
        
        console.log('客户端关闭连接')
    })
    connetcion.on('error',function (params) {
        
        console.log('客户端关闭失败')
    })
    connetcion.write('hello world! \r\n');
    connetcion.pipe(connetcion);
})
server.listen(9000,function (params) {
    console.log('server is listening')
})

// var net = require('net');
var client = net.connect({port:9000},function (params) {
    console.log('连接到服务器')
})
client.on('data',function (data) {
    console.log(data.toString());
    client.end();
})
client.on('end',function (params) {
    console.log('断开与服务器的链接')
})
client.on('error',function (params) {
    console.log('链接失败')
})