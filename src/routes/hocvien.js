const checkLogged = require("../middleware/checkLogin");
const checkPermission = require("../middleware/checkPermission");
const express = require("express");
const router = express.Router();

const HocVienController = require("../app/controllers/HocvienController");

router.use(
  "/",
  checkLogged.checkLoggedIn,
  checkPermission.checkPermission(["QTV"]),
  HocVienController.index
);

module.exports = router;
