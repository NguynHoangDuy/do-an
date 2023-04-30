const checkLogged = require("../../middleware/checkLogin");
const checkPermission = require("../../middleware/checkPermission");
const express = require("express");
const router = express.Router();

const HocVienController = require("../../app/controllers/HocVienController/HocVienDangKyController");

router.use(
    "/huydangky/:makhcc",
    checkLogged.checkLoggedIn,
    checkPermission.checkPermission(["HV"]),
    HocVienController.huyDangKy
);
router.use(
    "/dangky/:makhcc",
    checkLogged.checkLoggedIn,
    checkPermission.checkPermission(["HV"]),
    HocVienController.dangKy
);
router.use(
    "/",
    checkLogged.checkLoggedIn,
    checkPermission.checkPermission(["HV"]),
    HocVienController.index
);

module.exports = router;
