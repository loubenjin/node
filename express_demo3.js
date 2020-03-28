const express = require('express')
const app = express()
const port = 9000

app.use('/public',express.static('public'))

app.get('/', (req, res) => res.send('Hello World!'))
var server = app.listen(port, () => {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})