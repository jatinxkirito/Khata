const mongoose = require("mongoose");

const supplierBillschema = new mongoose.Schema({
  transactionDate: {
    type: "Date",
    default: Date.now(),
  },
  amount: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  pending: {
    type: mongoose.SchemaTypes.Number,
    default: 0,
  },
  items: [
    {
      item: { type: mongoose.SchemaTypes.ObjectId, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  supplier: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Supplier",
    required: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});
const SupplierBill = mongoose.model("SupplierBill", supplierBillschema);
module.exports = SupplierBill;
