const checkLogged = require("../../middleware/checkLogin");
const checkAuthor = require("../../middleware/checkPermission");
const addImage = require("../../middleware/addImage");
const updateImage = require("../../middleware/updateImage");
const express = require("express");
const router = express.Router();

const AdminController = require("../../app/controllers/AdminController/AdminKhoaHocController");

router.post(
  "/modangky",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.moDangKy
);
router.use(
  "/xoakhoahoc",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.xoaKhoaHoc
);
router.post(
  "/capnhatkhoahoc",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.capNhatKhoaHoc
);
router.post(
  "/themkhoahoc",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.themKhoaHoc
);
router.use(
  "/",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.index
);

module.exports = router;
