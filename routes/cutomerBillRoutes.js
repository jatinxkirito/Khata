const express = require("express");
const customerBillRouter = express.Router();
const customerBillController = require("../controllers/customerBillController");
customerBillRouter.route("/add").post(customerBillController.createBill);
customerBillRouter.route("/get/:id").get(customerBillController.getBill);
customerBillRouter.route("/findBills").get(customerBillController.findBills);
customerBillRouter
  .route("/markPaid/:id")
  .patch(customerBillController.markPaid);
module.exports = customerBillRouter;
