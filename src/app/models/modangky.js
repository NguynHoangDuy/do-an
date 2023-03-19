const con = require("../../config/db");
class MoDangKy {
  async xemDsLop(maKHCC) {
    const dslop = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `SELECT MA_LOP,khoa_hoc.MA_KH as MA_KH, TEN_KH, TEN_LOP, HO_TEN FROM khoa_hoc INNER JOIN mo_dang_ky on khoa_hoc.MA_KH = mo_dang_ky.MA_KH INNER JOIN lop on lop.MA_KHCC = mo_dang_ky.MA_KHCC INNER JOIN giao_vien on lop.MA_GV = giao_vien.MA_GV WHERE mo_dang_ky.MA_KHCC = '${maKHCC}'`,
          (err, kq) => {
            if (err) {
              reject(err);
            } else {
              resolve(kq);
            }
          }
        );
      });
    };
    const kq = await dslop();
    return kq;
  }
  listMoDangKy(offset, perPage) {
    const list = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `SELECT MA_KHCC ,khoa_hoc.MA_KH as MA_KH, TEN_KH, TG_BD, TG_KT, HOC_PHI FROM mo_dang_ky INNER JOIN khoa_hoc on mo_dang_ky.MA_KH = khoa_hoc.MA_KH WHERE mo_dang_ky.TINH_TRANG = '1' Limit ${offset}, ${perPage};`,
          (err, kq) => {
            if (err) {
              reject(err);
            } else {
              resolve(kq);
            }
          }
        );
      });
    };
    return list();
  }

  async demMoDangKy(maKH = "", tenKH = "") {
    if (maKH || tenKH) {
      const count = () => {
        return new Promise((resolve, reject) => {
          con.query(
            `select count(*) as count FROM mo_dang_ky INNER JOIN khoa_hoc on mo_dang_ky.MA_KH = khoa_hoc.MA_KH where mo_dang_ky.TINH_TRANG = '1' and TEN_KH = "%${tenKH}%" or mo_dang_ky.MA_KH = "${maKH}"`,
            (err, kq) => {
              if (err) {
                reject(0);
              } else {
                resolve(kq[0].count);
              }
            }
          );
        });
      };
      return count();
    } else {
      const count = () => {
        return new Promise((resolve, reject) => {
          con.query(
            `select count(*) as count FROM mo_dang_ky where mo_dang_ky.TINH_TRANG = '1' `,
            (err, kq) => {
              if (err) {
                reject(0);
              } else {
                resolve(kq[0].count);
              }
            }
          );
        });
      };
      return count();
    }
  }

  timkiemKH(offset, perPage, maKH, tenKH) {
    const timkiem = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `select MA_KHCC ,khoa_hoc.MA_KH as MA_KH, TEN_KH, TG_BD, TG_KT, HOC_PHI FROM mo_dang_ky INNER JOIN khoa_hoc on mo_dang_ky.MA_KH = khoa_hoc.MA_KH where mo_dang_ky.TINH_TRANG = '1' and (TEN_KH = "%${tenKH}%" or mo_dang_ky.MA_KH = "${maKH}") Limit ${offset}, ${perPage}`,
          (err, kq) => {
            if (err) {
              resolve([]);
            } else {
              resolve(kq);
            }
          }
        );
      });
    };
    return timkiem();
  }

  capnhat(maKHCC, maKH, tgBD, tgKT, hocphi, tt) {
    const capnhat = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `UPDATE mo_dang_ky SET MA_KH ='${maKH}',TG_BD='${tgBD}',TG_KT='${tgKT}',HOC_PHI='${hocphi}',TINH_TRANG='${tt}' WHERE MA_KHCC = '${maKHCC}'`,
          (err, kq) => {
            if (err) {
              reject(err);
            } else {
              resolve(1);
            }
          }
        );
      });
    };
    return capnhat();
  }

  xoaModangky(maKHCC) {
    const xoa = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `DELETE FROM mo_dang_ky WHERE MA_KHCC = '${maKHCC}'`,
          (err, kq) => {
            if (err) {
              reject(err);
            } else {
              resolve(1);
            }
          }
        );
      });
    };
    return xoa();
  }
}

module.exports = MoDangKy;
