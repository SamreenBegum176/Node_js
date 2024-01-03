const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);

    if (req.url === '/home') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>Welcome home</h1></body></html>');
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>Welcome to About Us page</h1></body></html>');
    } else if (req.url === '/node') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>Welcome to my Node.js project</h1></body></html>');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>Page Not Found</h1></body></html>');
    }
});
server.listen(3000, () => {
    console.log('Server is running on port 4000');
});