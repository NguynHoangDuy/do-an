const checkLogged = require("../../middleware/checkLogin");
const checkAuthor = require("../../middleware/checkPermission");
const express = require("express");
const router = express.Router();

const AdminController = require("../../app/controllers/AdminController/AdminLuongController");

router.use(
    "/giaovien/tinhluong",
    checkLogged.checkLoggedIn,
    checkAuthor.checkPermission(["QTV"]),
    AdminController.themLuongGV
);
router.use(
    "/giaovien",
    checkLogged.checkLoggedIn,
    checkAuthor.checkPermission(["QTV"]),
    AdminController.index
);

module.exports = router;
