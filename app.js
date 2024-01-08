const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));


app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="tittle"><br><input type="tel" name="size"><button type="submit">Add Product</button><form>');
});
// next(); Allows the request to continue to the next middleware in line

app.use('/product',  (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    res.send('<h1>Hello from Express</h1>');
});

app.listen(4000);