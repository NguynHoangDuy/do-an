const bcrypt = require("bcrypt");
const GiaoVien = require("../../models/giaovien");
const ChiNhanh = require("../../models/chinhanh");

class AdminGiaoVienController {
  async index(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    let perPage = 2; // số lượng sản phẩm xuất hiện trên 1 page
    const hoten = req.query.timkiem;
    let page = parseInt(req.query.trang) || 1;
    const offset = (page - 1) * perPage;
    if (!hoten) {
      const gv = new GiaoVien();
      const totalCount = await gv.demGv("", req.session.chinhanh);
      const totalPages = Math.ceil(totalCount / perPage);
      const listGv = await gv.getAllGv(offset, perPage, req.session.chinhanh);
      res.render("./admin/giaovien/", {
        listGv: listGv,
        current: page,
        pages: totalPages,
        perPage: perPage,
        tk: false,
      });
    } else {
      const gv = new GiaoVien();
      const totalCount = await gv.demGv(hoten, req.session.chinhanh);
      const totalPages = Math.ceil(totalCount / perPage);
      const listGv = await gv.timkiemGiaoVien(
        offset,
        perPage,
        hoten,
        req.session.chinhanh
      );
      res.render("./admin/giaovien", {
        listGv: listGv,
        current: page,
        pages: totalPages,
        perPage: perPage,
        tk: true,
        hoten: hoten,
      });
    }
  }

  async themgiaovien(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    const chiNhanh = new ChiNhanh();
    const admin = req.session.chinhanh;
    const dsMaCN = await chiNhanh.xemChiNhanh();
    res.render("./admin/giaovien/them", { admin, dsMaCN });
  }
  async themgiaovien_action(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    console.log(req.file.path)
    const { hoten, gt, ngaysinh, sdt, diachi, email, trinhdo } = req.body;
    let cn;
    if (req.session.chinhanh) {
      cn = req.session.chinhanh;
    } else {
      cn = req.body.chinhanh;
    }
    let anh_dd;
    if (req.file) {
      anh_dd = req.file.path;
    } else anh_dd = "";
    const gv = new GiaoVien();
    const maGv = await gv.layMaGV();
    const mkArr = req.body.ngaysinh.split("-");
    const mk = mkArr.reverse().join("");
    const salt = bcrypt.genSaltSync(10);
    const mkHash = await bcrypt.hashSync(mk, salt);
    const kq = await gv.themgiaovien(
      maGv,
      hoten,
      gt,
      ngaysinh,
      sdt,
      diachi,
      email,
      mkHash,
      trinhdo,
      anh_dd,
      cn
    );
    if (kq === 1) {
      req.flash("success", "Thêm giáo viên thành công.");
      res.redirect(`/admin/giaovien`);
    } else {
      req.flash("fail", "Thêm giáo viên không thành công");
      res.redirect(`/admin/giaovien/themgiaovien`);
    }
  }

  async xemgiaovien(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    const magv = req.query.magv;
    const gv = new GiaoVien();
    const chiNhanh = new ChiNhanh();
    const dsMaCN = await chiNhanh.xemChiNhanh();
    const kq = await gv.xemthongtin(magv);
    function formatDate(date) {
      if (date !== "0000-00-00") {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      } else {
        return "0000-00-00";
      }
    }
    res.render("./admin/giaovien/xem", {
      kq,
      formatDate,
      dsMaCN,
    });
  }
  async suathongtin(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    const magv = req.query.magv;
    const gv = new GiaoVien();
    const chiNhanh = new ChiNhanh();
    const admin = req.session.chinhanh;
    const dsMaCN = await chiNhanh.xemChiNhanh();
    const kq = await gv.xemthongtin(magv);
    function formatDate(date) {
      if (date !== "0000-00-00") {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      } else {
        return "0000-00-00";
      }
    }
    res.render("./admin/giaovien/sua", {
      kq,
      formatDate,
      dsMaCN,
      admin,
    });
  }
  async suathongtin_action(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    const magv = req.query.magv;
    const { hoten, gt, ngaysinh, sdt, diachi, email, trinhdo } = req.body;
    const gv = new GiaoVien();
    const kq = await gv.xemthongtin(magv);
    let anh_dd;
    if (req.file) {
      anh_dd = req.file.path;
    } else anh_dd = kq.ANH_DD;
    let cn;
    if (req.session.chinhanh) {
      cn = req.session.chinhanh;
    } else {
      cn = req.body.chinhanh;
    }
    const kqCN = await gv.capnhatgiaovien(
      magv,
      hoten,
      gt,
      ngaysinh,
      sdt,
      diachi,
      email,
      trinhdo,
      anh_dd,
      cn
    );
    if (kqCN === 1) {
      req.flash("success", "Cập nhật giáo viên thành công.");
      res.redirect(`/admin/giaovien/xemgiaovien?magv=${magv}`);
    } else {
      req.flash("fail", "Cập nhật giáo viên không thành công.");
      res.redirect(`/admin/giaovien/xemgiaovien?magv=${magv}`);
    }
  }

  async xoagiaovien(req, res) {
    const magv = req.query.magv;
    const gv = new GiaoVien();
    const kq = await gv.xoagiaovien(magv);
    if (kq === 1) {
      req.flash("success", "Xóa giáo viên thành công.");
      res.redirect(`/admin/giaovien`);
    } else {
      req.flash("fail", "Xóa giáo viên không thành công.");
      res.render(`/admin/giaovien/xemgiaovien?magv=${magv}`);
    }
  }
  async resetMK(req, res) {
    const magv = req.query.magv;
    const gv = new GiaoVien();
    const giaovien = await gv.xemthongtin(magv);
    const ngaySinh = giaovien.NGAY_SINH;
    const date = new Date(ngaySinh);
    const mk = `${date.getDate()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${date.getFullYear()}`;
    const salt = bcrypt.genSaltSync(10);
    const mkHash = await bcrypt.hashSync(mk, salt);
    const kq = await gv.resetMK(magv, mkHash);
    if (kq === 1) {
      req.flash("success", "Cập nhật mật khẩu thành công.");
      res.redirect(`/admin/giaovien`);
    } else {
      req.flash("fail", "Cập nhật mật khẩu thành công.");
      res.render(`/admin/giaovien/xemgiaovien?magv=${magv}`);
    }
  }
}

module.exports = new AdminGiaoVienController();
