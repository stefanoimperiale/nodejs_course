const http = require('http');

const server = http.createServer((req, resp) => {
    //console.log(req.url, req.method, req.headers);
    resp.setHeader('Content-Type', 'text/html');
    resp.write('<html lang="en">');
    resp.write('<head><title>My first page</title></head>');
    resp.write('<body><h1>Hello from my Nodejs Server!</h1></body>');
    resp.write('</html>');
    resp.end();

});

server.listen(3000);
 
