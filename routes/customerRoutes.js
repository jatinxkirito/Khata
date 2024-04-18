const express = require("express");
const {
  getCustomer,
  addCustomer,
} = require("../controllers/customerController");
const customerRouter = express.Router();

customerRouter.route("/get/:id").get(getCustomer);
customerRouter.route("/add").post(addCustomer);
module.exports = customerRouter;
