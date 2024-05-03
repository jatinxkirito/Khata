const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");
productRouter.route("/add").post(productController.createProduct);
productRouter.route("/get/:id").get(productController.getProduct);
productRouter.route("/findProducts").get(productController.findProducts);
module.exports = productRouter;
