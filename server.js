const http = require('http');

/*const server = http.createServer((req, res) => {
    console.log("Samreen Begum");

    response.writeHead(200, { 'Content-Type' : 'text/plain'});
    response.end('Samreen logged in the console!');
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/
const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html');
    res.end();
});

server.listen(4000);