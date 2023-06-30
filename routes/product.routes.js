const express = require("express");
const router = express.Router();
const Controller = require("../controllers/product.controller");
const auth = require("../middlewares/authentication");
const authProduct = require("../middlewares/authProduct");

router.get("/", Controller.getAllProduct);

router.use(auth);
router.post("/", Controller.newProduct);
router.get("/:id", Controller.getProductById);
router.put("/:id", authProduct, Controller.updateProduct);
router.delete("/:id", authProduct, Controller.deleteProduct);

module.exports = router;
