const productModel = require("../daos/model/products.model")
const adminMdw = (req, res, next) => {
    console.log("REVISANDO LA adm**", req.email);
    if (req.email === "adminCoder@coder.com" && req.password === "adminCod3r123") {
        const products =  productModel.find({}).lean();
        return res.render("products", { productos: products,
            first_name: Admin ,
            email: req.email || email,
            rol: admin, 
            
          });
    }
    return next();
    
  };
  
  module.exports = adminMdw;