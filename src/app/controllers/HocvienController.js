class HocVienController {
  index(req, res) {
    res.render("./hocvien/hocvien");
  }
}

module.exports = new HocVienController();
