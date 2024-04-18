const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
dotenv.config({ path: "./config.env" });
console.log(process.env.DATABASE);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("Blobfish");
  })
  .catch((error) => {
    console.log(error);
  });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(port);
});
