const checkLogged = require("../../middleware/checkLogin");
const checkPermission = require("../../middleware/checkPermission");
const express = require("express");
const router = express.Router();

const GiaoVienController = require("../../app/controllers/GiaovienController");

router.use(
  "/",
  checkLogged.checkLoggedIn,
  checkPermission.checkPermission(["GV"]),
  GiaoVienController.index
);

module.exports = router;
