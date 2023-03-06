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
  "/hocvien/themhocvien",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.themhocvien
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
