class GiaoVienController {
  index(req, res) {
    const name = req.session.ten;
    res.render("./giaovien/giaovien", { quyen: "Giáo viên", ten: name });
  }
}

module.exports = new GiaoVienController();
