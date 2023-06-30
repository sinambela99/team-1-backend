const express = require("express");
const router = express.Router();
const Controller = require("../controllers/payment_transaction.controller");
const auth = require("../middlewares/authentication");

router.use(auth);

router.get("/", Controller.getAllPayTrans);
router.get("/:id", Controller.getPayTransById);
router.post("/", Controller.createNewPayTrans);
router.put("/:id", Controller.updatePayTrans);
router.delete("/:id", Controller.deletePayTrans);

module.exports = router;
