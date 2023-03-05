exports.checkPermission = (permission) => {
  return (req, res, next) => {
    if (req.session.username) {
      if (!permission.includes(req.session.quyen)) {
        if (req.session.quyen === "HV") return res.redirect("/hocvien");
        else if (req.session.quyen === "GV") return res.redirect("/giaovien");
        else return res.redirect("/admin");
      } else {
        return next();
      }
    }
  };
};
