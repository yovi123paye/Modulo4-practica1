const express = require("express");
const productController = require("./../controllers/productController");
const productRouter = express.Router();
//routes
productRouter
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.addProduct);
  
productRouter.route("/:id")
             .get(productController.getProductById)
             .delete(productController.eliminarProductoPorId)
             .put(productController.editarProductoPorId);
module.exports = productRouter;
