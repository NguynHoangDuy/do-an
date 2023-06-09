const checkLogged = require("../../middleware/checkLogin");
const checkAuthor = require("../../middleware/checkPermission");
const express = require("express");
const router = express.Router();

const AdminController = require("../../app/controllers/AdminController/AdminPhongController");

router.use(
     "/xoa/:maphong",
     checkLogged.checkLoggedIn,
     checkAuthor.checkPermission(["QTV"]),
     AdminController.xoa
);
router.use(
     "/capnhat/:maphong",
     checkLogged.checkLoggedIn,
     checkAuthor.checkPermission(["QTV"]),
     AdminController.capnhat
);
router.use(
     "/them",
     checkLogged.checkLoggedIn,
     checkAuthor.checkPermission(["QTV"]),
     AdminController.them
);
router.use(
     "/",
     checkLogged.checkLoggedIn,
     checkAuthor.checkPermission(["QTV"]),
     AdminController.index
);

module.exports = router;
