const con = require("../../config/db");
const bcrypt = require("bcrypt");
class GuestController {
  index(req, res) {
    res.render("index", { title: "Hey " });
  }
  loginForm(req, res) {
    res.render("login");
  }

  dangnhap(req, res) {
    const { username, password } = req.body;
    if (username && password) {
      con.query(
        `SELECT * FROM quan_tri_vien WHERE MA_QTV='${username}'`,
        (err, result) => {
          if (err) {
            res.redirect("/");
          } else {
            if (result.length !== 0) {
              bcrypt.compare(password, result[0].MAT_KHAU, (err, kq) => {
                if (kq) {
                  req.session.loggedin = true;
                  req.session.quyen = result[0].MA_QUYEN;
                  req.session.ten = result[0].MA_QTV;
                  req.session.username = result[0].MA_QTV;
                  res.redirect("./admin");
                } else {
                  console.log(result[0].MAT_KHAU);
                  console.log("sai");
                }
              });
            } else {
              con.query(
                `SELECT * FROM giao_vien WHERE MA_GV='${username}'`,
                (err, result) => {
                  if (err) {
                    res.redirect("/");
                  } else {
                    if (result.length !== 0) {
                      bcrypt.compare(
                        password,
                        result[0].MAT_KHAU,
                        (err, kq) => {
                          if (kq) {
                            req.session.loggedin = true;
                            req.session.quyen = result[0].MA_QUYEN;
                            req.session.ten = result[0].HO_TEN;
                            req.session.username = result[0].MA_GV;
                            res.redirect("./giaovien");
                          } else {
                            console.log(result[0].MAT_KHAU);
                            console.log("sai");
                          }
                        }
                      );
                    } else {
                      con.query(
                        `SELECT * FROM hoc_vien WHERE MA_HV='${username}'`,
                        (err, result) => {
                          if (err) {
                            res.redirect("/");
                          } else {
                            if (result.length !== 0) {
                              bcrypt.compare(
                                password,
                                result[0].MAT_KHAU,
                                (err, kq) => {
                                  if (kq) {
                                    req.session.loggedin = true;
                                    req.session.quyen = result[0].MA_QUYEN;
                                    req.session.ten = result[0].HO_TEN;
                                    req.session.username = result[0].MA_HV;
                                    res.redirect("./hocvien");
                                  } else {
                                    console.log(result[0].MAT_KHAU);
                                    console.log("sai");
                                  }
                                }
                              );
                            } else {
                              console.log("Invalid username");
                              res.redirect("/");
                            }
                          }
                        }
                      );
                    }
                  }
                }
              );
            }
          }
        }
      );
    }
  }
  dangxuat(req, res) {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    });
  }
}

module.exports = new GuestController();
