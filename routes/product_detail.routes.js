const express = require("express");
const router = express.Router();
const Controller = require("../controllers/product_detail.controller");
const auth = require("../middlewares/authentication");

// router.use(auth);
router.get("/", Controller.getAllProduct_detail);
router.get("/:id", Controller.getProduct_detailById);
router.post("/", Controller.newProduct_detail);
router.put("/:id", Controller.updateProduct_detail);
router.delete("/:id", Controller.deleteProduct_detail);

module.exports = router;
