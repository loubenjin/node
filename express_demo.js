const express = require('express')
const app = express()
const port = 9002

 app.get('/', (req, res) => res.send('Hello World!'))
 var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})