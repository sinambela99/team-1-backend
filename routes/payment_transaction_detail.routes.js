const express = require("express");
const router = express.Router();
const Controller = require("../controllers/payment_transaction_detail.controller");

router.get("/", Controller.getAllPayTransDet);
router.get("/:id", Controller.getPayTransDetById);
router.post("/", Controller.createNewPayTransDet);
router.put("/:id", Controller.updatePayTransDet);
router.delete("/:id", Controller.deletePayTransDet);

module.exports = router;
