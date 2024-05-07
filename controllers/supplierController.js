const Supplier = require("../models/supplierModel");

exports.getSupplier = async (req, res, next) => {
  const id = req.params.id;
  const data = await Supplier.findById(id).populate("products");
  //console.log(data);
  return res.status(200).json({
    message: "success",
    data,
  });
};
exports.createSupplier = async (req, res, next) => {
  const prev = await Supplier.findOne({
    contact: req.body.contact,
    user: req.body.user,
  });
  // console.log(prev);
  if (prev)
    return res
      .status(400)
      .json({ status: "fail", message: "Supplier already exists" });
  const bd = await Supplier.create(req.body);

  return res.status(201).json({
    status: "success",
    data: {
      supplier: bd,
    },
  });
};
exports.editSupplier = async (req, res, next) => {
  const dt = {};
  if (req.body.name) dt["name"] = req.body.name;
  if (req.body.contact) dt["contact"] = req.body.contact;
  const ot = await Supplier.findByIdAndUpdate(req.params.id, dt, {
    returnOriginal: false,
  });
  return res.status(200).json({ status: "success", data: ot });
};
exports.findSuppliers = async (req, res, next) => {
  const suppliers = await Supplier.find({ user: req.params.user });

  return res.status(200).json({ status: "success", data: suppliers });
};
