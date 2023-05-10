const checkLogged = require("../../middleware/checkLogin");
const checkAuthor = require("../../middleware/checkPermission");
const uploadImage = require("../../middleware/uploadImage");
const AdminDMKHController = require("../../app/controllers/AdminController/AdminDMKHController");

const express = require("express");
const router = express.Router();

router.get(
    "/khoahoc/:madm/:makh/:makhcc",
    checkLogged.checkLoggedIn,
    checkAuthor.checkPermission(["QTV"]),
    AdminDMKHController.dsLop
);
router.get(
    "/khoahoc/:madm/:makh",
    checkLogged.checkLoggedIn,
    checkAuthor.checkPermission(["QTV"]),
    AdminDMKHController.modangky
);
router.get(
    "/khoahoc/:madm",
    checkLogged.checkLoggedIn,
    checkAuthor.checkPermission(["QTV"]),
    AdminDMKHController.khoahoc
);
router.post(
    "/them",
    uploadImage.single("anh_dd"),
    checkLogged.checkLoggedIn,
    checkAuthor.checkPermission(["QTV"]),
    AdminDMKHController.them
);
router.use(
    "/xoa",
    checkLogged.checkLoggedIn,
    checkAuthor.checkPermission(["QTV"]),
    AdminDMKHController.xoa
);
router.post(
    "/sua",
    uploadImage.single("anh_dd"),
    checkLogged.checkLoggedIn,
    checkAuthor.checkPermission(["QTV"]),
    AdminDMKHController.capNhat
);
router.use(
    "/",
    checkLogged.checkLoggedIn,
    checkAuthor.checkPermission(["QTV"]),
    AdminDMKHController.index
);

module.exports = router;
