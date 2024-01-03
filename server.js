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
const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);

    const url = req.url;
    const method = req.method;
    if(url === '/'){
        //fs.readFile("message.txt", { encoding: "utf-8"}, (err, data) => {
            //if(err){
                //console.log(err);
           // }
            //console.log(`data from file` + data);
            res.write("<html>");
            res.write("<head><title>Enter Message</title></head>");
            //res.write(`<body>${data}</body>`);
            res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
            res.write("</html>");
            return res.end();
       // });
    }

    else if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
        
    }else{
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
        res.write('</html');
        res.end();
    }
});

server.listen(4000);*/
const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        fs.readFile('message.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const messages = data ? data.split('\n') : [];
                
                res.write('<html>');
                res.write('<head><title>Enter Message</title></head>');
                //res.write('<h2>Messages</h2><ul>');
                res.write('<body>');
                messages.forEach(message => {
                    if (message.trim() !== '') {
                        res.write(`${message}`);
                    }
                });
                res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
                res.write('</body>');
                res.write('</html>');
                return res.end();
            }
        });
    } else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message + '\n', (err) => {
                if (err) {
                    console.error(err);
                } else {
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    return res.end();
                }
            });
        });
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
        res.write('</html>');
        return res.end();
    }
});

server.listen(4000);

