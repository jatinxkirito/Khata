const SupplierBill = require("../models/supplierBillModel");
exports.getBill = async (req, res, next) => {
  const id = req.params.id;
  const data = await SupplierBill.findById(id);
  return res.status(200).json({
    message: "success",
    data,
  });
};
exports.createBill = async (req, res, next) => {
  const bd = await SupplierBill.create(req.body);

  return res.status(201).json({
    status: "success",
    data: {
      bill: bd,
    },
  });
};
exports.findBills = async (req, res, next) => {
  if (req.query.customer) {
    var bills = await SupplierBill.find({
      user: req.query.user,
      supplier: req.query.supplier,
    });
  }
  bills = await SupplierBill.find({ user: req.query.user });
  return res.status(200).json({ status: "success", data: bills });
};
