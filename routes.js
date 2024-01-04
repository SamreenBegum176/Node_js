const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        fs.readFile('message.txt', 'utf8', (err, data) => {
            if(err){
                console.error(err);
            } else {
                const messages = data ? data.split('\n') : [];
    
                res.write('<html>');
                res.write('<head><title>Enter Message</title></head>');
                res.write('<body>');
                messages.forEach(message => {
                    if(message.trim() !== ''){
                        res.write(`${message}`);
                    }
                });
                res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
                res.write('</body>');
                res.write('</html>');
                return res.end();
            }
        });
    } else if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            fs.writeFile('message.txt', message + '\n', (err) => {
                if(err){
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
};

module.exports =requestHandler;
/*module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
};*/

//module.exports.handler = requestHandler;
//module.exports.someText = 'Some hard coded text';

//exports.handler = requestHandler;
//exports.someText = 'Some hard coded text';
