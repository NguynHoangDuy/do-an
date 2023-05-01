const checkLogged = require("../../middleware/checkLogin");
const checkPermission = require("../../middleware/checkPermission");
const express = require("express");
const router = express.Router();

const HocVienController = require("../../app/controllers/HocVienController");

router.use(
    "/thoikhoabieu",
    checkLogged.checkLoggedIn,
    checkPermission.checkPermission(["HV"]),
    HocVienController.thoikhoabieu
);
router.use(
    "/",
    checkLogged.checkLoggedIn,
    checkPermission.checkPermission(["HV"]),
    HocVienController.index
);

module.exports = router;
