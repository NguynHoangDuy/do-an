const checkLogged = require("../../middleware/checkLogin");
const checkAuthor = require("../../middleware/checkPermission");
const AdminBaiVietController = require("../../app/controllers/AdminController/AdminBaiVietController");
const uploadImage = require("../../middleware/uploadImage");
const express = require("express");
const router = express.Router();

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

router.use(
    "/",
    checkLogged.checkLoggedIn,
    checkAuthor.checkPermission(["QTV"]),
    AdminBaiVietController.index
);

module.exports = router;
