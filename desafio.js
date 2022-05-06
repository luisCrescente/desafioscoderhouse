const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs'); 
const products = require('./products');
const allProducts = 'productos.txt';


app.get('/products', (req, res, next )=>{
    res.send(products);
});



app.get('/productsRandom', (req, res, next )=>{
    try {
        fs.readFile(allProducts,"utf-8", (error, object) => {
            const getAllProducts = JSON.parse(object);

            const max=getAllProducts[getAllProducts.length-1].id;
            const random = (Math.floor(Math.random()*max))+1;

            for (let i=0; i < getAllProducts.length; i++) {
                
                if(random==getAllProducts[i].id){
                    res.send(getAllProducts[i]);
                }
            } 
        });
    } catch (err){ console.log(err);}
    
});

app.listen(port,()=>{
    console.log(`servidor levantado en el puerto : ${port}`);
});

