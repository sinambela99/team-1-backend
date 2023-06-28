const express = require("express");
const router = express.Router();
const Controller = require("../controllers/user.controller");
const auth = require("../middlewares/authentication");
const authUser = require("../middlewares/authUser");

router.get("/", Controller.getAllUsers);
router.use(auth);
router.get("/:id", Controller.getUserById);
router.put("/:id", authUser, Controller.updateUser);
router.delete("/:id", authUser, Controller.deleteUser);

module.exports = router;
