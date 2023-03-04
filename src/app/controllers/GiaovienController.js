class GiaoVienController {
  index(req, res) {
    res.render("./giaovien/giaovien");
  }
}

module.exports = new GiaoVienController();
