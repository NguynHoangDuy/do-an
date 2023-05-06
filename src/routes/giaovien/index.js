const checkLogged = require("../../middleware/checkLogin");
const checkPermission = require("../../middleware/checkPermission");
const addImage = require("../../middleware/addImage");
const express = require("express");
const router = express.Router();

const GiaoVienController = require("../../app/controllers/GiaoVienController");

router.get(
    "/luong",
    checkLogged.checkLoggedIn,
    checkPermission.checkPermission(["GV"]),
    GiaoVienController.luongGV
);
router.post(
    "/capnhatthongtin",
    checkLogged.checkLoggedIn,
    checkPermission.checkPermission(["GV"]),
    addImage.single("anh_dd"),
    GiaoVienController.suathongtin_action
);
router.get(
    "/capnhatthongtin",
    checkLogged.checkLoggedIn,
    checkPermission.checkPermission(["GV"]),
    GiaoVienController.capNhatThongTin
);
router.use(
    "/thoikhoabieu",
    checkLogged.checkLoggedIn,
    checkPermission.checkPermission(["GV"]),
    GiaoVienController.thoikhoabieu
);
router.use(
    "/",
    checkLogged.checkLoggedIn,
    checkPermission.checkPermission(["GV"]),
    GiaoVienController.index
);

module.exports = router;
