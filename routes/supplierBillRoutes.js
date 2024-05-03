const express = require("express");
const supplierBillRouter = express.Router();
const supplierBillController = require("../controllers/supplierBillController");
supplierBillRouter.route("/add").post(supplierBillController.createBill);
supplierBillRouter.route("/get/:id").get(supplierBillController.getBill);
supplierBillRouter.route("/findBills").get(supplierBillController.findBills);
module.exports = supplierBillRouter;
