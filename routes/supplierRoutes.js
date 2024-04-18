const express = require("express");
const supplierRouter = express.Router();
const supplierController = require("../controllers/supplierController");
supplierRouter.route("/add").post(supplierController.createSupplier);
supplierRouter.route("/get/:id").get(supplierController.getSupplier);
module.exports = supplierRouter;