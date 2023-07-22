const express = require("express");
const router = express.Router();
const Controller = require("../controllers/product.controller");
const auth = require("../middlewares/authentication");
const authProduct = require("../middlewares/authProduct");

router.get("/", Controller.getAllProduct);
router.get("/highest", Controller.highPrice);
router.get("/lowest", Controller.lowerPrice);

// router.use(auth);
router.get("/:id", Controller.getProductById);
router.post("/", Controller.newProduct);
router.put("/:id", Controller.updateProduct);
router.delete("/:id", Controller.deleteProduct);

module.exports = router;
