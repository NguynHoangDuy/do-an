const express = require("express");
const router = express.Router();
const checkLogged = require("../../middleware/checkLogin");
const checkAuthor = require("../../middleware/checkPermission");
const AdminController = require("../../app/controllers/AdminController/AdminLopController");
const DMController = require("../../app/controllers/AdminController/AdminDMKHController");

router.post("/tkb/them", AdminController.addTkb);
router.post("/tkb/xoa", AdminController.xoaTkb);
router.post("/them", AdminController.addNewLop);
router.post("/sua/:malop", AdminController.updateLop);
router.post("/xoa/:malop", AdminController.removeLop);
router.post("/hocvien/:malop", DMController.themHV);
router.use("/hocvien/:malop/xoa/:mahv", DMController.xoaHV);
router.use("/hocvien/:malop/hp/:mahv", DMController.hocPhiHV);
router.get(
    "/hocvien/:malop",
    checkLogged.checkLoggedIn,
    checkAuthor.checkPermission(["QTV"]),
    DMController.dsHocVien
);

module.exports = router;
