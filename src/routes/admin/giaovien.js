const checkLogged = require("../../middleware/checkLogin");
const checkAuthor = require("../../middleware/checkPermission");
const express = require("express");
const router = express.Router();

const AdminController = require("../../app/controllers/AdminController");

router.use(
  "/themgiaovien",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.themgiaovien
);
router.use(
  "/",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.giaovien
);

module.exports = router;
