const con = require("../../../config/db");
class HocVienController {
  index(req, res) {
    const name = req.session.ten;
    res.render("./hocvien/hocvien", { quyen: "Học viên", ten: name });
  }
}

module.exports = new HocVienController();
