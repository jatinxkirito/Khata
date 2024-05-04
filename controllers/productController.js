const Product = require("../models/productModel");

const slugify = require("slugify");
exports.getProduct = async (req, res, next) => {
  const id = req.params.id;
  const data = await Product.findById(id);
  return res.status(200).json({
    message: "success",
    data,
  });
};
exports.createProduct = async (req, res, next) => {
  //const dt = req.body;
  const slug = slugify(req.body.name, { lower: true });
  const prev = await Product.findOne({
    slug,
    price: req.body.price,
    user: req.body.user,
    supplier: req.body.supplier,
  });
  //console.log(prev);
  if (prev) {
    return res
      .status(400)
      .json({ status: "fail", message: "Product already exists" });
  }
  const bd = await Product.create({ ...req.body, slug });

  return res.status(201).json({
    status: "success",
    data: {
      Product: bd,
    },
  });
};
exports.findProducts = async (req, res, next) => {
  if (req.query.supplier) {
    var products = await Product.find({
      user: req.query.user,
      supplier: req.query.supplier,
    });
  }
  products = await Product.find({ user: req.query.user });
  return res.status(200).json({ status: "success", data: products });
};
