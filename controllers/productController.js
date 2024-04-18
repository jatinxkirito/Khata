const Product = require("../models/productModel");
exports.getProduct = async (req, res, next) => {
  const id = req.params.id;
  const data = await Product.findById(id);
  return res.status(200).json({
    message: "success",
    data,
  });
};
exports.createProduct = async (req, res, next) => {
  const bd = await Product.create(req.body);

  return res.status(201).json({
    status: "success",
    data: {
      Product: bd,
    },
  });
};
