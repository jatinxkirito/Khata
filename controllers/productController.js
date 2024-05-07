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

exports.editProduct = async (req, res, next) => {
  var dt = {};
  var { name, image, price } = req.body;
  slug = undefined;
  if (name) slug = slugify(name, { lower: true });
  dt = { name, image, slug };
  if (price) dt["price"] = price;
  // console.log(dt);
  const ot = await Product.findByIdAndUpdate(req.params.id, dt, {
    new: true,
  });

  return res.status(200).json({ status: "success", data: ot });
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
