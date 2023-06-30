const express = require("express");
const router = express.Router();
const Controller = require("../controllers/cart.controller");
const auth = require("../middlewares/authentication");
const authCart = require("../middlewares/authCart");

router.get("/", Controller.getAllCart);
router.use(auth);
router.get("/:id", authCart, Controller.getCartById);
router.post("/", authCart, Controller.newCart);
router.put("/:id", authCart, Controller.updateCart);
router.delete("/:id", authCart, Controller.deleteCart);

module.exports = router;
