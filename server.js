var http = require('http');

var url = require('url');

function start(route) {
    function onRequest(request,response) {
        var pathname = url.parse(request.url).pathname;
        console.log('Request for' + pathname + 'recevied.');

        route(pathname);

        response.writeHead(200,{'Content-Type':'text/plain'});
        response.write('hello World');
        response.end();
    }
    http.createServer(onRequest).listen(8300);
    console.log('server is start');
}
exports.start = start;

