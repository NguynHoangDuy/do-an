const BaiViet = require("../../models/bai_viet");

class AdminBaiVietController {
  async index(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    const baiviet = new BaiViet();
    const baivietList = await baiviet.getAll();
    console.log(baivietList);
    res.render("./admin");
  }
}

module.exports = new AdminBaiVietController();
