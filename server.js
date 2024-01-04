/*const http = require('http');
const fs = require('fs');


/*const server = http.createServer((req, res) => {
    console.log("Samreen Begum");

    response.writeHead(200, { 'Content-Type' : 'text/plain'});
    response.end('Samreen logged in the console!');
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
*/

const http = require('http');
const routes = require('./routes');

console.log(routes.someText);

const server = http.createServer(routes.handler);
server.listen(4000);
