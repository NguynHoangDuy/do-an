const QuanTriVien = require("../../models/quantrivien");
const HocVien = require("../../models/hocvien");
const GiaoVien = require("../../models/giaovien");
const HomePage = require("../../models/homePage");
const bcrypt = require("bcrypt");
class GuestController {
  async index(req, res) {
    const home = new HomePage();
    const banner = await home.bannerImage();
    console.log(banner);
    res.render("index", { banner });
  }
  loginForm(req, res) {
    res.render("login");
  }

  async dangnhap(req, res) {
    const qtv = new QuanTriVien();
    const gv = new GiaoVien();
    const hv = new HocVien();
    const { username, password } = req.body;
    let loginQTV = await qtv.dangnhap(username);
    let loginGV = await gv.dangnhap(username);
    let loginHV = await hv.dangnhap(username);
    if (username && password) {
      if (
        loginQTV.length === 0 &&
        loginGV.length === 0 &&
        loginHV.length === 0
      ) {
        res.redirect("/dangnhap");
        return;
      }
      if (loginQTV.length !== 0) {
        bcrypt.compare(password, loginQTV[0].MAT_KHAU, (err, kq) => {
          if (kq) {
            req.session.loggedin = true;
            req.session.quyen = loginQTV[0].MA_QUYEN;
            req.session.ten = loginQTV[0].MA_QTV;
            req.session.username = loginQTV[0].MA_QTV;
            req.session.chinhanh = loginQTV[0].MA_CHI_NHANH;
            res.redirect("./admin");
            return;
          } else {
            res.redirect("/dangnhap");
            return;
          }
        });
      }
    }
    if (loginGV.length !== 0) {
      bcrypt.compare(password, loginGV[0].MAT_KHAU, (err, kq) => {
        if (kq) {
          req.session.loggedin = true;
          req.session.quyen = loginGV[0].MA_QUYEN;
          req.session.ten = loginGV[0].HO_TEN;
          req.session.username = loginGV[0].MA_GV;
          req.session.chinhanh = loginGV[0].MA_CHI_NHANH;
          res.redirect("./giaovien");
          return;
        } else {
          res.redirect("/dangnhap");
          return;
        }
      });
    }
    if (loginHV.length !== 0) {
      bcrypt.compare(password, loginHV[0].MAT_KHAU, (err, kq) => {
        if (kq) {
          req.session.loggedin = true;
          req.session.quyen = loginHV[0].MA_QUYEN;
          req.session.ten = loginHV[0].HO_TEN;
          req.session.username = loginHV[0].MA_HV;
          req.session.chinhanh = loginHV[0].MA_CHI_NHANH;
          res.redirect("./hocvien");
          return;
        } else {
          res.redirect("/dangnhap");
          return;
        }
      });
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
