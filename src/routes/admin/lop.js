const express = require("express");
const router = express.Router();

const AdminController = require("../../app/controllers/AdminController/AdminLopController");

router.post("/them", AdminController.addNewLop);
router.post("/sua/:malop", AdminController.updateLop);
router.post("/xoa/:malop", AdminController.removeLop);
router.post("/tkb/them", AdminController.addTkb);

module.exports = router;
