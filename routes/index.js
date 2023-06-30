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

router.post("/api/register", userController.register);
router.post("/api/login", userController.login);

router.use("/api/user", user);
router.use("/api/product", product);
router.use("/api/category", category);
router.use("/api/product-detail", productDetail);
router.use("/api/cart", cart);
router.use("/api/stock", stock);
router.use("/api/payment-transaction", paymentTransaction);
router.use("/api/payment-transaction-detail", paymentTransactionDetail);

module.exports = router;
