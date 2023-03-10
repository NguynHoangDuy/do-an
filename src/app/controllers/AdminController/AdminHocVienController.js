const bcrypt = require("bcrypt");
const HocVien = require("../../models/hocvien");
class AdminHocVienController {
  async index(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    let perPage = 2; // số lượng sản phẩm xuất hiện trên 1 page
    let page = parseInt(req.query.trang) || 1;
    const offset = (page - 1) * perPage;
    const hv = new HocVien();
    const totalCount = await hv.demHv("", "");
    const totalPages = Math.ceil(totalCount / perPage);
    const listHv = await hv.getAllHv(offset, perPage);
    res.render("./admin/hocvien", {
      listHv: listHv,
      current: page,
      pages: totalPages,
      perPage: perPage,
    });
  }

  async timkiem(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    let perPage = 2; // số lượng sản phẩm xuất hiện trên 1 page
    let page = parseInt(req.query.trang) || 1;
    const offset = (page - 1) * perPage;
    const hoten = req.query.hoten;
    const sdt = req.query.sdt;
    if (!hoten && !sdt) {
      const hv = new HocVien();
      const totalCount = await hv.demHv("", "");
      const totalPages = Math.ceil(totalCount / perPage);
      const listHv = await hv.getAllHv(offset, perPage);
      res.render("./admin/hocvien/timkiem", {
        listHv: listHv,
        current: page,
        pages: totalPages,
        perPage: perPage,
      });
    } else {
      const hv = new HocVien();
      const totalCount = await hv.demHv(hoten, sdt);
      const totalPages = Math.ceil(totalCount / perPage);
      const listHv = await hv.timkiemHV(offset, perPage, hoten, sdt);
      res.render("./admin/hocvien/timkiem", {
        listHv: listHv,
        current: page,
        pages: totalPages,
        kq: totalCount,
        hoten: hoten,
        sdt: sdt,
        perPage: perPage,
      });
    }
  }

  themhocvien(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    res.render("./admin/hocvien/them");
  }
  async themhocvien_action(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    const {
      hoten,
      gt,
      ngaysinh,
      sdt,
      diachi,
      email,
      dt,
      lop,
      truong,
      phuhuynh,
      sdtph,
      nganh,
      truongdh,
      cv,
    } = req.body;
    const hv = new HocVien();
    const mahv = await hv.layMaHV();
    // mahv.then((kq) => console.log(kq));
    const mkArr = ngaysinh.split("-");
    const mk = mkArr.reverse().join("");
    const salt = bcrypt.genSaltSync(10);
    const mkHash = bcrypt.hashSync(mk, salt);

    const kq = hv.themhocvien(
      mahv,
      hoten,
      gt,
      ngaysinh,
      sdt,
      diachi,
      email,
      mkHash,
      dt,
      lop,
      truong,
      phuhuynh,
      sdtph,
      nganh,
      truongdh,
      cv
    );
    if (kq) {
      res.redirect(`/admin/hocvien/kqthem?ma=${mahv}`);
    }
  }
  kqthem(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    const ma = req.query.ma;
    res.render(`./admin/hocvien/kqthem`, { ma: ma });
  }
  async xemhocvien(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    const ma = req.query.mahv;
    const hv = new HocVien();
    function formatDate(date) {
      if (date !== null) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      } else {
        return "0000-00-00";
      }
    }
    const kqHv = await hv.xemthongtin(ma);
    res.render("./admin/hocvien/xem", { hv: kqHv, formatDate });
  }
  async suahocvien(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    const ma = req.query.mahv;
    const hv = new HocVien();
    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    const kqHv = await hv.xemthongtin(ma);
    res.render("./admin/hocvien/sua", { hv: kqHv, formatDate });
  }
  async suahocvien_action(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    const ma = req.query.mahv;
    const {
      hoten,
      gt,
      ngaysinh,
      sdt,
      diachi,
      email,
      dt,
      lop,
      truong,
      phuhuynh,
      sdtph,
      nganh,
      truongdh,
      cv,
      tinhtrang,
    } = req.body;
    const hv = new HocVien();
    const kq = hv.capnhathocvien(
      ma,
      hoten,
      gt,
      ngaysinh,
      sdt,
      diachi,
      email,
      dt,
      lop,
      truong,
      phuhuynh,
      sdtph,
      nganh,
      truongdh,
      cv,
      tinhtrang
    );
    console.log(kq);
    if (kq) {
      console.log(kq);
      res.redirect(`/admin/hocvien/xemhocvien?mahv=${ma}`);
    }
  }
  xoahocvien(req, res) {
    const ma = req.query.mahv;
    const hv = new HocVien();
    const kq = hv.xoahocvien(ma);
    if (kq) {
      res.redirect(`/admin/hocvien/`);
    }
  }
}

module.exports = new AdminHocVienController();
