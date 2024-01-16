const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        fs.readFile("message.txt", { encoding: "utf-8"}, (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Internal Server Error');
            }
    
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<html>');
            res.write('<head><title>Enter Message</title>');
            res.write('<style>body { font-family: Arial, sans-serif; background-color: #f4f4f4; }</style>');
            res.write('</head>');
            res.write('<body>');
            res.write(`<h1>Welcome to my Node.js Server</h1>`);
            res.write(`<div>${data}</div>`);
            res.write('<form action="/message" method="POST">');
            res.write('<input type="text" name="message" placeholder="Enter your message">');
            res.write('<button type="submit">Send</button>');
            res.write('</form>');
            res.write('</body>');
            res.write('</html>');
            return res.end();
        });
    } else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
    
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    return res.end();
                }
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            });
        });
        return;
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body style="font-family: Arial, sans-serif; background-color: #f4f4f4;">');
        res.write('<h1>Hello from my Node.js Server</h1>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    }
}

//if we have multiple exports then
module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
}
//module.exports = requestHandler; // Exporting this file to app.js with the help request Hanlder