const checkLogged = require("../middleware/checkLogin");
const checkAuthor = require("../middleware/checkPermission");
const express = require("express");
const router = express.Router();

const AdminController = require("../app/controllers/AdminController");

router.use(
  "/hocvien/timkiem",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.timkiem
);
router.use(
  "/giaovien",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.giaovien
);
router.use(
  "/hocvien/xemhocvien",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.xemhocvien
);
router.get(
  "/hocvien/capnhathocvien",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.suahocvien
);
router.post(
  "/hocvien/capnhathocvien",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.suahocvien_action
);
router.post(
  "/hocvien/themhocvien",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.themhocvien_action
);
router.use(
  "/hocvien/xoahocvien",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.xoahocvien
);
router.get(
  "/hocvien/themhocvien",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.themhocvien
);
router.get(
  "/hocvien/kqthem",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.kqthem
);
router.use(
  "/hocvien",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.hocvien
);
router.use(
  "/",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.index
);

module.exports = router;
