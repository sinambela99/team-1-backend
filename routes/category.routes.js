const express = require("express");
const router = express.Router();
const Controller = require("../controllers/category.controller");

router.get("/category", Controller.getAllCategory);
router.get("/category/:id", Controller.getCategoryById);
router.post("/category", Controller.createNewCategory);
router.put("/category/:id", Controller.updateCategory);
router.delete("/category/:id", Controller.deleteCategory);

module.exports = router;
