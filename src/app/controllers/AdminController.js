class AdminController {
  index(req, res) {
    res.render("./admin/admin");
  }
}

module.exports = new AdminController();
