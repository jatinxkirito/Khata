const mongoose = require("mongoose");
const validator = require("validator");

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: [true, "Name is required"],
    },

    contact: {
      type: "String",
      required: [true, "Phone number is required"],
      validate: [
        validator.isMobilePhone,
        "Please provide a valid phone number",
      ],
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    photo: {
      type: String,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
supplierSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "supplier",
  justOne: false,
});
const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;
