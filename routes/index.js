const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const user = require("./user.routes");
const product = require("./product.routes");
const category = require("./category.routes");
const productDetail = require("./product_detail.routes");
const cart = require("./cart.routes");
const stock = require("./stock.routes");
const paymentTransaction = require("./payment_transaction.routes");
const paymentTransactionDetail = require("./payment_transaction_detail.routes");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.use("/user", user);
router.use("/product", product);
router.use("/category", category);
router.use("/product-detail", productDetail);
router.use("/cart", cart);
router.use("stock", stock);
router.use("/payment-transaction", paymentTransaction);
router.use("/payment-transaction-detail", paymentTransactionDetail);

module.exports = router;
