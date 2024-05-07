const { response } = require("express");
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
exports.editCustomer = async (req, res, next) => {
  const dt = {};
  if (req.body.name) dt["name"] = req.body.name;
  if (req.body.contact) dt["contact"] = req.body.contact;
  const ot = await Customer.findByIdAndUpdate(req.params.id, dt, {
    returnOriginal: false,
  });
  return res.status(200).json({ status: "success", data: ot });
};
exports.findCustomers = async (req, res, next) => {
  const customers = await Customer.find({ user: req.params.user });

  return res.status(200).json({ status: "success", data: customers });
};
