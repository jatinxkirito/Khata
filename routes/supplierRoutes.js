const express = require("express");
const supplierRouter = express.Router();
const supplierController = require("../controllers/supplierController");
supplierRouter.route("/add").post(supplierController.createSupplier);
supplierRouter.route("/get/:id").get(supplierController.getSupplier);
supplierRouter
  .route("/findSuppliers/:user")
  .get(supplierController.findSuppliers);
supplierRouter
  .route("/editSupplier/:id")
  .patch(supplierController.editSupplier);
module.exports = supplierRouter;
