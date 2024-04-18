require("express-async-errors");
const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const customerRouter = require("./routes/customerRoutes");
const supplierRouter = require("./routes/supplierRoutes");
const productRouter = require("./routes/productRoutes");
const customerBillRouter = require("./routes/cutomerBillRoutes");
const supplierBillRouter = require("./routes/supplierBillRoutes");
const ErrorController = require("./controllers/errorController");
const AppError = require("./utils/appError");
app.use(express.json());
app.use("/api/v1/user", userRouter);

app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/supplier", supplierRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/customerBill", customerBillRouter);
app.use("/api/v1/supplierBill", supplierBillRouter);
app.use("*", (req, res, next) => {
  const error = new AppError(
    `Can't find address ${req.originalUrl} on this server`,
    404
  );

  next(error);
});
app.use(ErrorController);
module.exports = app;
