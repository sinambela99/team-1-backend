const express = require("express");
const router = express.Router();
const Controller = require("../controllers/category.controller");

router.get("/", Controller.getAllCategory);
router.get("/:id", Controller.getCategoryById);
router.post("/", Controller.createNewCategory);
router.put("/:id", Controller.updateCategory);
router.delete("/:id", Controller.deleteCategory);

module.exports = router;
