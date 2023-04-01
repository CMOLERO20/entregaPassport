const { Router } =  require("express");   
const ProductManager = require("../daos/manager/productManager");
const routerProducts = Router();

const productManager = new ProductManager()

routerProducts.get('/', async (req,res) => {
    try {
        const productos =  await productManager.getAllProducts();
       
    
        res.render('products', {productos: productos     
        })
    } catch (error) { 
        console.log("🚀 ~ file: productManager.js:10 ~ ProductManager ~ getAllProducts= ~ error:", error)
        
    }
} );

routerProducts.get('/:pid', async (req,res) => {
try {
    let id = req.params.pid
    return res.send(await productManager.getProductById(id))
} catch (error) {
    
}

} );

routerProducts.post('/', async (req , res)=>{
    try {
        let productBody = req.body;
        const newP = await productManager.addProduct(productBody);
        return res.send({status:"succes", payload: newP});

    } catch (error) {
        
    }
})

routerProducts.put('/:pid', async(req,res)=>{
    try {
        let id = req.params.pid
        let {prop,content} = req.body;
        return res.send(await productManager.updateProduct(id,prop,content))
    } catch (error) {
        
    }
})

routerProducts.delete('/:pid', async (req,res)=>{
    try {
        let id = req.params.pid
        await productManager.deleteProduct(id)
    return res.send('Producto eliminado')
    } catch (error) {
        
    }
})



module.exports = routerProducts;