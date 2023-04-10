const checkLogged = require("../../middleware/checkLogin");
const checkAuthor = require("../../middleware/checkPermission");
const AdminBaiVietController = require("../../app/controllers/AdminController/AdminBaiVietController");

const express = require("express");
const router = express.Router();

router.use(
  "/",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminBaiVietController.index
);

module.exports = router;
