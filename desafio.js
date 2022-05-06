const express = require('express');
const app = express();
const fs = require('fs'); 
const port = 8080;
const products = require('./products');

app.get('/products', (req, res, next )=>{
    res.send(products);
});



app.get('/productRandom', (req, res, next )=>{
    res.send();
});

app.listen(port,()=>{
    console.log(`servidor levantado en el puerto : ${port}`);
});

