const fs = require('fs'); 

class contenedor {
    
    constructor(file){   

        this.file = file;
        this.products = [];
        this.id = 0;

    };

    async save (product) {
        try{
            product ={
                ...product,
                id: this.id +1,

            };
            this.id = product.id
            this.products.push(product);
            await fs.promises.writeFile(`./${this.file}.txt`, JSON.stringify(this.products, null, '\t'));
            return product.id
        } catch (err) {
            console.log(err);
        };
        
    };

    async getAll () {
        try{
            const products  = await fs.promises.readFile(`${this.file}.txt`,  "utf-8");
            const allProducts  = JSON.parse(products);
            return allProducts;
        } catch (err) {
            console.log(err);
        }
    };

    async getById (id){
        try{
            const productId = await this.getAll();
            let getProduct = productId.filter( product => product.id == id);
            return getProduct;
        }catch (err) {
            console.log(err);
        }
    };

    async deleteById (id) {
        try{
                const product = await this.getAll();
                const deleteProduct = product.filter(product => product.id !== id );
                await fs.promises.writeFile(`./${this.file}.txt`, JSON.stringify(deleteProduct, null, '\t'));
                
        } catch (err){
            console.log(err);
        }
    };

    async deleteAll (){
        try{
            await fs.promises.writeFile(`${this.file}.txt`, '');
        } catch (err) { 
            console.log(err);
        }
    };
};

product1 = {
    title: 'Televisor',
    price: 150000,
    thumbnail:'https://http2.mlstatic.com/D_NQ_NP_945454-MLA49577095632_042022-O.webp'
};

product2 = {
    title: 'Telefono',
    price: 15000,
    thumbnail:'https://http2.mlstatic.com/D_NQ_NP_896790-MLA44547132275_012021-O.webp'
};

product3 ={
    title:'Tenedor',
    price:100,
    thumbnail:'https://http2.mlstatic.com/D_NQ_NP_765770-MLA41341839133_042020-O.webp'
};

const prueba = new contenedor('productos');


prueba.save(product1);
prueba.save(product2);
prueba.save(product3).then((resultado) => console.log(resultado));

//prueba.getAll().then((resultado) => console.log(resultado));

//prueba.getById(2).then((resultado) => console.log(resultado));

//prueba.deleteById(3).then((resultado) => console.log('producto borrado'));

//prueba.deleteAll().then((resultado) => console.log('todos los productos borrados'));


module.exports = prueba ;