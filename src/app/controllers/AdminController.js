const con = require("../../config/db");
class AdminController {
  index(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    res.render("./admin/admin");
  }

  hocvien(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    let perPage = 2; // số lượng sản phẩm xuất hiện trên 1 page
    let page = parseInt(req.query.trang) || 1;
    const offset = (page - 1) * perPage;
    con.query("select count(*) as count from hoc_vien", (err, count) => {
      if (err) {
        console.log("sai");
      } else {
        const totalCount = count[0].count;
        const totalPages = Math.ceil(totalCount / perPage);

        con.query(
          `Select * from hoc_vien Limit ${offset}, ${perPage}`,
          (err, result) => {
            if (err) {
              console.log("Lỗi");
              res.render("./admin/hocvien");
            } else {
              res.render("./admin/hocvien", {
                listHv: result,
                current: page,
                pages: totalPages,
              });
            }
          }
        );
      }
    });
  }

  timkiem(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    let perPage = 2; // số lượng sản phẩm xuất hiện trên 1 page
    let page = parseInt(req.query.trang) || 1;
    const offset = (page - 1) * perPage;
    con.query("select count(*) as count from hoc_vien", (err, count) => {
      if (err) {
        console.log("sai");
      } else {
        const totalCount = count[0].count;
        const totalPages = Math.ceil(totalCount / perPage);

        con.query(
          `Select * from hoc_vien Limit ${offset}, ${perPage}`,
          (err, result) => {
            if (err) {
              console.log("Lỗi");
              res.render("./admin/hocvien");
            } else {
              res.render("./admin/hocvien/timkiem", {
                listHv: result,
                current: page,
                pages: totalPages,
              });
            }
          }
        );
      }
    });
  }

  themhocvien(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    res.render("./admin/hocvien/them");
  }
}

module.exports = new AdminController();
