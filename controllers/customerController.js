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
  const prev = await Customer.findOne({
    contact: req.body.contact,
    user: req.body.user,
  });
  // console.log(prev);
  if (prev)
    return res
      .status(400)
      .json({ status: "fail", message: "Customer already exists" });
  const bd = await Customer.create(req.body);
  return res.status(201).json({
    status: "success",
    data: {
      customer: bd,
    },
  });
};
exports.findCustomers = async (req, res, next) => {
  const customers = await Customer.find({ user: req.params.user });

  return res.status(200).json({ status: "success", data: customers });
};
