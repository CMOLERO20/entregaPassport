
const productModel = require("../model/products.model");

class ProductManager {

     getAllProducts = async () => {
        try {
            const productArr = await productModel.find({}).lean();
            return productArr
        } catch (error) { 
            console.log("🚀 ~ file: productManager.js:10 ~ ProductManager ~ getAllProducts= ~ error:", error)
            
        }
     };

     getProductById = async (pid) => {
        try {
            const productById = await productModel.findById({_id: pid})
            if(!productById) return 'producto no encontrado'
            return productById
        } catch (error) {
            
        }
     }

     addProduct = async (newProduct) => {
        try {
             
        return await productModel.create(newProduct);
        } catch (error) {
            console.log("🚀 ~ file: productManager.js:31 ~ ProductManager ~ addProduct= ~ error:", error)
            
        }
     }
     async updateProduct(id,prop,content){

        try {
            const producto = await this.getProductById(id);
            if(!producto)return 'Producto no encontrado'
            producto[prop] = content;
            const result = await productModel.updateOne({_id:id},producto);
            return result
        } catch (error) {
            console.log("🚀 ~ file: app.js:82 ~ ProductManager ~ updateProduct ~ error", error)
            
        }
    }

        deleteProduct = async (pid) => {
            try {
                const result = await productModel.deleteOne({_id: pid})
                return result
            } catch (error) {
                console.log("🚀 ~ file: productManager.js:54 ~ ProductManager ~ deleteProduct ~ error:", error)
                
            }
        }
      }



module.exports =  ProductManager;