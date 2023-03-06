class GiaoVienController {
  index(req, res) {
    res.locals.quyen = "Giáo viên";
    res.locals.ten = req.session.ten;
    res.render("./giaovien/giaovien");
  }
}

module.exports = new GiaoVienController();
