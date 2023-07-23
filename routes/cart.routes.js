const express = require("express");
const router = express.Router();
const Controller = require("../controllers/cart.controller");
const auth = require("../middlewares/authentication");
const authCart = require("../middlewares/authCart");
const authBuyer = require("../middlewares/authBuyer");

router.get("/", Controller.getAllCart);
router.use(auth);
router.post("/", authBuyer, Controller.newCart);
router.get("/:id", Controller.getCartById);
router.put("/:id", authCart, Controller.updateCart);
router.delete("/:id", authCart, Controller.deleteCart);

module.exports = router;
