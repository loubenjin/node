const express = require('express')
const app = express()
const port = 9000

app.get('/', (req, res) => res.send('Hello get!'))

app.post('/',function (req,res) {
    console.log('主页post请求')
    res.send('hello get')
})

app.get('/del_user',function (req,res) {
    console.log('/del_user 响应delete请求')
    res.send('删除页面')
})
// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {   
    console.log("/ab*cd GET 请求");
    res.send('正则匹配');
 })
var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
app.on('error',function (error,data) {
    if(error){
        console.log(error);
    }
    console.log(data)
})
