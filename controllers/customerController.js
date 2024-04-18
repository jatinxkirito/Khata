const Customer = require("../models/customerModel");
exports.getCustomer = async (req, res, next) => {
  const id = req.params.id;
  const customer = await Customer.findById(id);
  return res.status(200).json({
    message: "success",
    data: customer,
  });
};
exports.addCustomer = async (req, res, next) => {
  const bd = await Customer.create(req.body);
  return res.status(201).json({
    status: "success",
    data: {
      customer: bd,
    },
  });
};
