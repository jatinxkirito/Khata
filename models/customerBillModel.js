const mongoose = require("mongoose");
const customerBillschema = new mongoose.Schema({
  transactionDate: {
    type: "Date",
    default: Date.now(),
  },
  amount: {
    type: "Number",
    required: true,
  },
  items: [
    {
      item: { type: mongoose.SchemaTypes.ObjectId, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  customer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Customer",
    required: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});
const CustomerBill = mongoose.model("CustomerBill", customerBillschema);
module.exports = CustomerBill;
