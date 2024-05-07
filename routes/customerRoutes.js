const express = require("express");
const customerController = require("../controllers/customerController");
const customerRouter = express.Router();

customerRouter.route("/get/:id").get(customerController.getCustomer);
customerRouter.route("/add").post(customerController.addCustomer);
customerRouter.route("/getforUser/:user").get(customerController.findCustomers);
customerRouter
  .route("/editCustomer/:id")
  .patch(customerController.editCustomer);

module.exports = customerRouter;
