const User = require("../models/userModel");
exports.getUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  return res.status(200).json({
    message: "success",
    data: user,
  });
};
exports.signup = async (req, res, next) => {
  const bd = await User.create(req.body);
  return res.status(201).json({
    status: "success",
    data: {
      user: bd,
    },
  });
};
