const con = require("../../config/db");
const bcrypt = require("bcrypt");
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
    const hoten = req.query.hoten;
    const sdt = req.query.sdt;
    if (!hoten && !sdt) {
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
    } else {
      con.query(
        `select count(*) as count from hoc_vien where HO_TEN like '%${hoten}%' or SDT='${sdt}'`,
        (err, count) => {
          if (err) {
            console.log("sai");
          } else {
            const totalCount = count[0].count;
            const totalPages = Math.ceil(totalCount / perPage);

            con.query(
              `Select * from hoc_vien where HO_TEN like '%${hoten}%'or SDT = '${sdt}' Limit ${offset}, ${perPage}`,
              (err, result) => {
                if (err) {
                  console.log("Lỗi");
                  res.render("./admin/hocvien");
                } else {
                  res.render("./admin/hocvien/timkiem", {
                    listHv: result,
                    current: page,
                    pages: totalPages,
                    kq: totalCount,
                    hoten: hoten,
                    sdt: sdt,
                  });
                }
              }
            );
          }
        }
      );
    }
  }

  themhocvien(req, res) {
    res.locals.quyen = "Quản trị viên";
    res.locals.ten = req.session.ten;
    res.render("./admin/hocvien/them");
  }
  themhocvien_action(req, res) {
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
      nganh,
      truongdh,
      cv,
    } = req.body;
    con.query("SELECT MAX(MA_HV) as MA_HV FROM hoc_vien", (err, id) => {
      if (err) {
        console.log("Sai");
      } else {
        const countMaHV = parseInt(id[0].MA_HV.substr(5)) + 1;
        const mahv = "ALFHV" + String(countMaHV).padStart(5, "0");
      }
    });
    const mkArr = ngaysinh.split("-");
    const mk = mkArr.reverse().join("");
    console.log(mk);
    res.render("./admin/hocvien/them");
  }
}

module.exports = new AdminController();
