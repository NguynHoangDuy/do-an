const bcrypt = require("bcrypt");
const KhoaHoc = require("../../models/khoahoc");

class AdminKhoaHocController {
  async index(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    let perPage = 2;
    let page = parseInt(req.query.trang) || 1;
    const offset = (page - 1) * perPage;
    const makh = req.query.maKH;
    const tenkh = req.query.tenKH;
    const khoaHoc = new KhoaHoc();
    if (!makh && !tenkh) {
      const totalCount = await khoaHoc.demKH();
      const totalPages = Math.ceil(totalCount / perPage);
      const listKH = await khoaHoc.dsKhoaHoc(offset, perPage);
      function formatMoney(num) {
        return Number(num).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      }
      res.render("./admin/khoahoc", {
        listKH,
        current: page,
        pages: totalPages,
        perPage: perPage,
        tk: false,
        formatMoney,
      });
    } else {
      const totalCount = await khoaHoc.demKH(makh, tenkh);
      const totalPages = Math.ceil(totalCount / perPage);
      const listKH = await khoaHoc.timkiemKH(offset, perPage, makh, tenkh);
      console.log(listKH);
      function formatMoney(num) {
        return Number(num).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      }
      res.render("./admin/khoahoc", {
        listKH,
        current: page,
        pages: totalPages,
        perPage: perPage,
        tk: true,
        makh,
        tenkh,
        formatMoney,
      });
    }
  }
  async themKhoaHoc(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    const { maKH, tenKH, hocphi } = req.body;
    console.log(req.body);
    const khoahoc = new KhoaHoc();
    const kq = await khoahoc.themkhoahoc(maKH, tenKH, hocphi);
    if (kq === 1) {
      req.flash("success", "Thêm khóa học thành công.");
      res.redirect(`/admin/khoahoc`);
    } else {
      req.flash("fail", "Thêm khóa học không thành công.");
      res.redirect(`/admin/khoahoc`);
    }
  }
  async capNhatKhoaHoc(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    const old = req.query.makh;
    console.log(old);
    const { maKH, tenKH, hocphi } = req.body;
    console.log(req.body);
    const khoahoc = new KhoaHoc();
    const kq = await khoahoc.capnhatkhoahoc(maKH, tenKH, hocphi, old);
    if (kq === 1) {
      req.flash("success", "Cập nhật khóa học thành công.");
      res.redirect(`/admin/khoahoc`);
    } else {
      req.flash("fail", "Cập nhật khóa học không thành công.");
      res.redirect(`/admin/khoahoc`);
    }
  }
  async xoaKhoaHoc(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    const old = req.query.makh;
    const khoahoc = new KhoaHoc();
    const kq = await khoahoc.xoakhoahoc(old);
    if (kq === 1) {
      req.flash("success", "Xóa khóa học thành công.");
      res.redirect(`/admin/khoahoc`);
    } else {
      req.flash("fail", "Xóa khóa học không thành công.");
      res.redirect(`/admin/khoahoc`);
    }
  }
  async moDangKy(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    const { makh, ngaybd, ngaykt, tt } = req.body;
    const khoahoc = new KhoaHoc();
    const kq = await khoahoc.moDangKy(makh, ngaybd, ngaykt, tt);
    if (kq === 1) {
      req.flash("success", "Mở đăng ký thành công.");
      res.redirect(`/admin/khoahoc`);
    } else {
      req.flash("fail", "Mở đăng ký không thành công.");
      res.redirect(`/admin/khoahoc`);
    }
  }
}

module.exports = new AdminKhoaHocController();
