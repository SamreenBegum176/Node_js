const http = require('http');

const server = http.createServer((request, response) => {
    console.log("Samreen Begum");

    response.writeHead(200, { 'Content-Type' : 'text/plain'});
    response.end('Samreen logged in the console!');
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});