const checkLogged = require("../middleware/checkLogin");
const checkAuthor = require("../middleware/checkPermission");
const express = require("express");
const router = express.Router();

const AdminController = require("../app/controllers/AdminController");

router.use(
  "/",
  checkLogged.checkLoggedIn,
  checkAuthor.checkPermission(["QTV"]),
  AdminController.index
);

module.exports = router;
