const checkLogged = require("../../middleware/checkLogin");
const checkAuthor = require("../../middleware/checkPermission");
const express = require("express");
const router = express.Router();

const AdminController = require("../../app/controllers/AdminController/AdminThongKeController");

router.get(
    "/hocphi",
    checkLogged.checkLoggedIn,
    checkAuthor.checkPermission(["QTV"]),
    AdminController.hocphi
);
router.use(
    "/",
    checkLogged.checkLoggedIn,
    checkAuthor.checkPermission(["QTV"]),
    AdminController.index
);

module.exports = router;
