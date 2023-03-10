class AdminController {
  index(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    res.render("./admin");
  }
}

module.exports = new AdminController();
