const mongoose = require("mongoose");
const validator = require("validator");

const customerSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: [true, "Name is required"],
  },
  contact: {
    type: "String",
    required: [true, "Phone number is required"],
    validate: [validator.isMobilePhone, "Please provide a valid phone number"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  photo: {
    type: "String",
    default: "default.jpg",
  },
  totalBusiness: {
    type: mongoose.SchemaTypes.Number,
    default: 0,
  },
  pendingAmount: {
    type: mongoose.SchemaTypes.Number,
    default: 0,
  },
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
