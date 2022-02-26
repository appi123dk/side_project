// require에서 ./ 경로가 있으면 내가만든거, http처럼 경로가 없으면 이미 있는 라이브러리
var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Hello Nodejs');
    response.end();
}).listen(3000);