const mongoose = require("mongoose");
const Product = require("./productModel");
const Customer = require("./customerModel");
const customerBillschema = new mongoose.Schema({
  transactionDate: {
    type: "Date",
    default: Date.now(),
  },
  amount: {
    type: "Number",
    required: true,
  },
  unpaid: {
    type: Number,
    default: 0,
  },
  items: [
    {
      item: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Product",
        required: true,
      },
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
customerBillschema.pre(/^find/, function (next) {
  this.populate({ path: "items.item", select: "name" });
  next();
});
customerBillschema.post("save", async function (data) {
  // console.log(req.body);
  const lst = data.items;
  await Customer.findByIdAndUpdate(data.customer, [
    {
      $set: {
        totalBusiness: {
          $add: ["$totalBusiness", data.amount],
        },
        pendingAmount: {
          $add: ["$pendingAmount", data.unpaid],
        },
      },
    },
  ]);
  for (i of lst) {
    await Product.findByIdAndUpdate((id = i.item), [
      {
        $set: {
          quantity: {
            $subtract: ["$quantity", i.quantity],
          },
          sales: {
            $add: ["$sales", i.quantity],
          },
        },
      },
    ]);
  }
  //console.log(data);
});

const CustomerBill = mongoose.model("CustomerBill", customerBillschema);
module.exports = CustomerBill;
