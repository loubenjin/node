var http = require('http');
var options = {
    host:'localhost',
    port:'9090',
    path:'/index.html'
}
var callback = function (response) {
    var body = '';
    response.on('data',function (data) {
        body+=data;
    })
    response.on('end',function () {
        console.log(body)
    })
}
var req = http.request(options,callback);
req.end();

console.log('Server running at http://127.0.0.1:9091/');