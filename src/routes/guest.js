const express = require("express");
const router = express.Router();

const GuestController = require("../app/controllers/GuestController");

router.get("/dangnhap", GuestController.loginForm);
router.post("/dangnhap", GuestController.dangnhap);
router.get("/", GuestController.index);
module.exports = router;
