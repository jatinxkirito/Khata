const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, VERIFICATION_SID } = process.env;
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
//console.log(process.env.DATABASE);
const twilio = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const getct = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET_KEY);
};
exports.sendOTP = async (req, res, next) => {
  //console.log(process.env.VERIFICATION_SID);
  verificationRequest = await twilio.verify.v2
    .services(process.env.VERIFICATION_SID)
    .verifications.create({ to: "+91" + req.body.number, channel: "sms" });
  //console.log(verificationRequest);
  return res.status(200).json({ status: "success" });
};
exports.verifyOTP = async (req, res, next) => {
  verificationResult = await twilio.verify.v2
    .services(process.env.VERIFICATION_SID)
    .verificationChecks.create({
      code: req.body.code,
      to: "+91" + req.body.number,
    });
  if (verificationResult.status === "approved")
    return res.status(200).json({ status: "success" });
  return res.status(500).json({ status: verificationResult.status });
};
exports.userExists = async (req, res, next) => {
  const number = req.body.number;
  const user = await User.findOne({ contact: number });
  if (user) return res.status(200).json({ status: "success", id: user._id });
  return next(
    new AppError(
      (message = "User not found. Please signup first"),
      (statusCode = 404)
    )
  );
};
exports.genToken = (req, res) => {
  const id = req.body.id;
  const token = getct(id);
  return res.status(200).json({ status: "success", token });
};
exports.verifyToken = async (req, res, next) => {
  const pr = await jwt.verify(
    req.body.token,
    process.env.JWT_SECRET_KEY,
    function (err, ky) {
      if (err) return next(err);
      return ky;
    }
  );

  if (!pr) return next(new AppError(`I think someone hacked`, 401));
  const user = await User.findById(pr.id);
  if (!user)
    return res.status(500).json({ status: "fail", message: "User not found" });
  return res.status(200).status(200).json({ status: "success", id: pr.id });
};
exports.userNew = async (req, res, next) => {
  const number = req.body.number;
  const user = await User.findOne({ contact: number });
  if (user)
    return next(
      new AppError(
        (message = "User exists before. Please login"),
        (statusCode = 404)
      )
    );

  return res.status(200).json({ status: "success" });
};
