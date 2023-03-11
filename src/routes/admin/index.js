const checkLogged = require("../../middleware/checkLogin");
const checkAuthor = require("../../middleware/checkPermission");
const express = require("express");
const router = express.Router();

const AdminController = require("../../app/controllers/AdminController");

router.post(
  "/quantrivien/themqtv",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.themQTV
);
router.use(
  "/quantrivien/xoaqtv",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.xoaQTV
);
router.post(
  "/quantrivien/doimk",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.doiMKQTV
);
router.use(
  "/quantrivien",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.quanTriVien
);
router.use(
  "/",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.index
);

module.exports = router;
