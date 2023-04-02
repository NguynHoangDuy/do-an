const checkLogged = require("../../middleware/checkLogin");
const checkAuthor = require("../../middleware/checkPermission");
const addImage = require("../../middleware/addImage");
const express = require("express");
const router = express.Router();

const AdminController = require("../../app/controllers/AdminController/AdminGiaoVienController");

router.post(
  "/themgiaovien",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  addImage.single("anh_dd"),
  AdminController.themgiaovien_action
);
router.get(
  "/themgiaovien",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.themgiaovien
);
router.use(
  "/xemgiaovien",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.xemgiaovien
);
router.use(
  "/xoagiaovien",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.xoagiaovien
);
router.use(
  "/resetMK",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.resetMK
);
router.post(
  "/capnhatgiaovien",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  addImage.single("anh_dd"),
  AdminController.suathongtin_action
);
router.get(
  "/capnhatgiaovien",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.suathongtin
);
router.get(
  "/",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.index
);

module.exports = router;
