const checkLogged = require("../../middleware/checkLogin");
const checkPermission = require("../../middleware/checkPermission");
const express = require("express");
const router = express.Router();

const HocVienController = require("../../app/controllers/HocVienController/HocVienDangKyController");

router.get("/dslop", HocVienController.danhSachLop);
router.use("/dangky/:malop", HocVienController.hvDangKy);
router.use("/huydangky/:malop", HocVienController.hvHuyDangKy);
router.use(
    "/",
    checkLogged.checkLoggedIn,
    checkPermission.checkPermission(["HV"]),
    HocVienController.dangKyLop
);

module.exports = router;
