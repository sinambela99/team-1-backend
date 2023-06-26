const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const formidableMiddleware = require("express-formidable");
dotenv.config();
const port = process.env.PORT;
const errorHandler = require("./middlewares/errHandler");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(formidableMiddleware())
app.use("/api", require("./routes/user.routes"));
app.use("/api", require("./routes/product.routes"));
app.use("/api", require("./routes/product_detail.routes"));
app.use("/api", require("./routes/stock.routes"));
app.use("/api", require("./routes/payment_transaction.routes"));
app.use("/api", require("./routes/cart.routes"));
app.use("/api", require("./routes/category.routes"));
app.use("/api", require("./routes/payment_transaction_detail.controller"));
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
