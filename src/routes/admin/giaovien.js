const checkLogged = require("../../middleware/checkLogin");
const checkAuthor = require("../../middleware/checkPermission");
const uploadImage = require("../../middleware/uploadImage");
const express = require("express");
const router = express.Router();

const AdminController = require("../../app/controllers/AdminController");

router.post(
  "/themgiaovien",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  uploadImage.single("anh_dd"),
  AdminController.themgiaovien_action
);
router.get(
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
