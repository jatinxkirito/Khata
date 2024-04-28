const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.route("/signup").post(userController.signup);
userRouter.route("/get/:id").get(userController.getUser);
module.exports = userRouter;
