/*const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        fs.readFile("message.txt", { encoding: "utf-8"}, (err,data) => {
            if(err){
                console.log(err);
            }
            console.log('data from file', data);
            res.write('<html>');
            res.write('<head><title>Enter Message</title></head>');
            res.write(`<body>${data}</body>`);
            res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>');
            res.write('</html>');
            return res.end();
        });
    }
    else if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) =>{
            body.push(chunk);
        });
        //on allows us to listen certain events and here the event we are listening is data event data event is fired whenever is new chunck is avaliable
        // second one is we are exeuting a function whenever we are getting a new data event
        req.on('end', () => {
            const parseBody =Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                if(err) {
                    console.error(err);
                    res.statusCode = 500;
                    return res.end();
                }
                res.statusCode = 302;
                res.setHeader('Location', '/'); //writeHead is used to write some meta information and 302 is used for redirecting
                res.end();
            });
            //  wrtieFileSync here Sync meand synchronous it blocks the next line of code untill this line finishes its execution
        });
       return;
    }
    else{
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>Hello from my Node.js Server</body>');
        res.write('</html>');
        res.end();
    }
    
});

server.listen(8000);*/

const http = require('http');
const routes = require('./routes'); // Here we are importing our routes.js file to app.js file

const server = http.createServer(routes.handler); // here simply saying that please execute the funtion which is in routes
//routes.handles because it storing main function reference

server.listen(8000);