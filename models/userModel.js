const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: [true, "Name is required"],
  },
  businessName: {
    type: "String",
    required: [true, "Name is required"],
  },
  contact: {
    type: "String",
    required: [true, "Phone number is required"],
    validate: [validator.isMobilePhone, "Please provide a valid phone number"],
    unique: true,
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
});
userSchema.index({ contact: 1 });

const User = mongoose.model("User", userSchema);
module.exports = User;
