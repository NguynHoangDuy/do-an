const express = require("express");
const checkLogged = require("../middleware/checkLogin");
const router = express.Router();

const GuestController = require("../app/controllers/GuestController");
router.use("/dangxuat", GuestController.dangxuat);
router.get(
  "/dangnhap",
  checkLogged.checkLoggedInDangNhap,
  GuestController.loginForm
);
router.post("/dangnhap", GuestController.dangnhap);
router.get("/", GuestController.index);
module.exports = router;
