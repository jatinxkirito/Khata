const express = require("express");
const customerBillRouter = express.Router();
const customerBillController = require("../controllers/customerBillController");
customerBillRouter.route("/add").post(customerBillController.createBill);
customerBillRouter.route("/get/:id").get(customerBillController.getBill);
customerBillRouter.route("/findBills").get(customerBillController.findBills);
module.exports = customerBillRouter;
