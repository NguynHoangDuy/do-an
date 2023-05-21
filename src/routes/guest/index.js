const express = require("express");
const checkLogged = require("../../middleware/checkLogin");
const router = express.Router();

const GuestController = require("../../app/controllers/GuestController");
router.use("/dangxuat", GuestController.dangxuat);
router.post(
    "/xacnhandangky",
    checkLogged.checkLoggedInDangNhap,
    GuestController.xacNhan
);
router.post(
    "/xacnhandangky-action",
    checkLogged.checkLoggedInDangNhap,
    GuestController.xacNhanAction
);
router.get(
    "/dangky",
    checkLogged.checkLoggedInDangNhap,
    GuestController.dangKyForm
);
router.get(
    "/dangnhap",
    checkLogged.checkLoggedInDangNhap,
    GuestController.loginForm
);
router.get("/timkiem", GuestController.timkiem);
router.post("/dangnhap", GuestController.dangnhap);
router.get("/giangvien", GuestController.giaovien);
router.get("/khoahoc", GuestController.khoahoc);
router.get("/baiviet", GuestController.baiviet);
router.get("/", GuestController.index);
module.exports = router;
