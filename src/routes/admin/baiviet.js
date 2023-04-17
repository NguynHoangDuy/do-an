const checkLogged = require("../../middleware/checkLogin");
const checkAuthor = require("../../middleware/checkPermission");
const AdminBaiVietController = require("../../app/controllers/AdminController/AdminBaiVietController");
const uploadImage = require("../../middleware/uploadImage");
const express = require("express");
const router = express.Router();

router.get(
    "/xoa/:id",
    checkLogged.checkLoggedIn,
    checkAuthor.checkPermission(["QTV"]),
    AdminBaiVietController.xoa
);

router.post(
    "/thembaiviet",
    uploadImage.single("hinh_anh"),
    checkLogged.checkLoggedIn,
    checkAuthor.checkPermission(["QTV"]),
    AdminBaiVietController.themAction
);
router.get(
    "/thembaiviet",
    checkLogged.checkLoggedIn,
    checkAuthor.checkPermission(["QTV"]),
    AdminBaiVietController.them
);
router.get(
    "/:id",
    checkLogged.checkLoggedIn,
    checkAuthor.checkPermission(["QTV"]),
    AdminBaiVietController.xem
);
router.post(
    "/:id",
    uploadImage.single("hinh_anh"),
    checkLogged.checkLoggedIn,
    checkAuthor.checkPermission(["QTV"]),
    AdminBaiVietController.capnhat
);
router.use(
    "/",
    checkLogged.checkLoggedIn,
    checkAuthor.checkPermission(["QTV"]),
    AdminBaiVietController.index
);

module.exports = router;
