exports.checkLoggedIn = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    res.redirect("/dangnhap");
  }
};
exports.checkLoggedInDangNhap = (req, res, next) => {
  if (req.session.username) {
    res.redirect("/admin");
  } else {
    next();
  }
};
