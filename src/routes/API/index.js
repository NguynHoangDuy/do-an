const express = require("express");
const router = express.Router();

const APIController = require("../../app/controllers/APIController");

router.get("/giaovien/:macn", APIController.getListGv);
router.get("/phonghoc", APIController.getListPh);
router.get("/thoigian", APIController.getListTgDay);
module.exports = router;
