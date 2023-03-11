const QuanTriVien = require("../../models/quantrivien");
const bcrypt = require("bcrypt");
class AdminController {
  index(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    res.render("./admin");
  }

  async quanTriVien(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    const qtv = new QuanTriVien();
    const listQTV = await qtv.getTK();
    res.render("./admin/quantrivien", { listQTV });
  }
  async themQTV(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    const qtv = new QuanTriVien();
    const maQTV = await qtv.layMaQTV();
    const mk = req.body.mk;
    const salt = bcrypt.genSaltSync(10);
    const mkHash = await bcrypt.hashSync(mk, salt);
    const kq = await qtv.themQtv(maQTV, mkHash);
    if (kq) {
      req.flash("success", "Thêm tài khoản thành công.");
      res.redirect(`/admin/quantrivien`);
    } else {
      req.flash("fail", "Thêm tài không khoản thành công.");
      res.redirect(`/admin/quantrivien`);
    }
  }
  async doiMKQTV(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    const qtv = new QuanTriVien();
    const maQTV = req.query.maqtv;
    const mk = req.body.mk;
    const salt = bcrypt.genSaltSync(10);
    const mkHash = await bcrypt.hashSync(mk, salt);
    const kq = await qtv.doiMK(maQTV, mkHash);
    if (kq) {
      req.flash("success", "Đổi mật khẩu thành công.");
      res.redirect(`/admin/quantrivien`);
    } else {
      req.flash("fail", "Đổi mật khẩu không khoản thành công.");
      res.redirect(`/admin/quantrivien`);
    }
  }
  async xoaQTV(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    const qtv = new QuanTriVien();
    const maQTV = req.query.maqtv;
    const kq = await qtv.xoaQtv(maQTV);
    if (kq) {
      req.flash("success", "Xóa tài khoản thành công.");
      res.redirect(`/admin/quantrivien`);
    } else {
      req.flash("fail", "Xóa tài khoản không khoản thành công.");
      res.redirect(`/admin/quantrivien`);
    }
  }
}

module.exports = new AdminController();
