const CustomerBill = require("../models/customerBillModel");
const Customer = require("../models/customerModel");
exports.getBill = async (req, res, next) => {
  const id = req.params.id;
  const data = await CustomerBill.findById(id);
  return res.status(200).json({
    message: "success",
    data,
  });
};
exports.createBill = async (req, res, next) => {
  const bd = await CustomerBill.create(req.body);

  return res.status(201).json({
    status: "success",
    data: {
      bill: bd,
    },
  });
};
exports.markPaid = async (req, res, next) => {
  const bill = await CustomerBill.findById(req.params.id).select(
    "unpaid customer"
  );
  const unpaid = bill.unpaid;
  const customer = bill.customer;
  await CustomerBill.findByIdAndUpdate(req.params.id, {
    unpaid: 0,
  });
  await Customer.findByIdAndUpdate(customer, [
    {
      $set: {
        pendingAmount: {
          $subtract: ["$pendingAmount", unpaid],
        },
      },
    },
  ]);
  return res.status(200).json({ status: "success" });
};
exports.findBills = async (req, res, next) => {
  if (req.query.customer) {
    var bills = await CustomerBill.find({
      user: req.query.user,
      customer: req.query.customer,
    });
  }
  bills = await CustomerBill.find({ user: req.query.user });
  return res.status(200).json({ status: "success", data: bills });
};
