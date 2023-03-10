const bcrypt = require("bcrypt");
const GiaoVien = require("../../models/giaovien");
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
      const totalCount = await gv.demGv("");
      const totalPages = Math.ceil(totalCount / perPage);
      const listGv = await gv.getAllGv(offset, perPage);
      res.render("./admin/giaovien", {
        listGv: listGv,
        current: page,
        pages: totalPages,
        perPage: perPage,
        tk: false,
      });
    } else {
      const gv = new GiaoVien();
      const totalCount = await gv.demGv(hoten);
      const totalPages = Math.ceil(totalCount / perPage);
      const listGv = await gv.timkiemGiaoVien(offset, perPage, hoten);
      res.render("./admin/giaovien", {
        listGv: listGv,
        current: page,
        pages: totalPages,
        perPage: perPage,
        tk: true,
      });
    }
  }

  themgiaovien(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    res.render("./admin/giaovien/them");
  }
  async themgiaovien_action(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    const { hoten, gt, ngaysinh, sdt, diachi, email, trinhdo } = req.body;

    let anh_dd;
    if (req.file) {
      anh_dd = req.file.filename;
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
      anh_dd
    );
    if (kq) {
      res.redirect(`/admin/hocvien/kqthem?ma=${maGv}`);
    } else {
      res.redirect(`/admin`);
    }
  }
}

module.exports = new AdminGiaoVienController();
