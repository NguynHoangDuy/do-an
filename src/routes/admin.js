const checkLoggedIn = require("../middleware/checkLogin")
const express = require("express");
const router = express.Router();

const AdminController = require("../app/controllers/AdminController");

router.use("/dangxuat", AdminController.dangxuat);
router.use("/", checkLoggedIn,AdminController.index);

module.exports = router;
