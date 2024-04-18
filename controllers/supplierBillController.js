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
