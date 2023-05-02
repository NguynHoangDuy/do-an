const checkLogged = require("../../middleware/checkLogin");
const checkPermission = require("../../middleware/checkPermission");
const uploadImage = require("../../middleware/uploadImage");
const express = require("express");
const router = express.Router();

const HocVienController = require("../../app/controllers/HocVienController");

router.post(
    "/capnhatthongtin",
    uploadImage.single("anh_dd"),
    checkLogged.checkLoggedIn,
    checkPermission.checkPermission(["HV"]),
    HocVienController.capNhatThongTinAction
);
router.get(
    "/capnhatthongtin",
    checkLogged.checkLoggedIn,
    checkPermission.checkPermission(["HV"]),
    HocVienController.capNhatThongTin
);
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
