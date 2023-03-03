const checkLoggedIn = (req, res, next) => {
    if (req.session.username) {
      next();
    } else {
      res.redirect('/dangnhap');
    }
  };
module.exports = checkLoggedIn