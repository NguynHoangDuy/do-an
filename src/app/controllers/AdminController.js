class AdminController {
  index(req, res) {
    const name = req.session.ten;
    res.render("./admin/admin", { quyen: "Quản trị viên", ten: name });
  }

  hocvien(req, res) {
    const name = req.session.ten;
    res.render("./admin/hocvien", { quyen: "Quản trị viên", ten: name });
  }
}

module.exports = new AdminController();
