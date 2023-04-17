const express = require("express");

const router = express.Router();

const GuestController = require("../../app/controllers/GuestController/GuestBaiVietController");

router.get("/:id", GuestController.chitiet);
module.exports = router;
