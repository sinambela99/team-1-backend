const express = require("express");
const router = express.Router();
const Controller = require("../controllers/stock.controller");

router.get("/", Controller.getAllStocks);
router.get("/:id", Controller.getStockById);
router.post("/", Controller.createNewProduct);
router.put("/:id", Controller.updateStock);
router.delete("/:id", Controller.deleteStock);

module.exports = router;
