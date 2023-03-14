const con = require("../../config/db");
class KhoaHoc {
  dsKhoaHocAll() {
    const dsKH = () => {
      return new Promise((resolve, reject) => {
        con.query(`SELECT * from khoa_hoc`, (err, kq) => {
          if (err) {
            resolve([]);
          } else {
            resolve(kq);
          }
        });
      });
    };
    return dsKH();
  }
  dsKhoaHoc(offset, perPage) {
    const dsKH = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `SELECT * from khoa_hoc Limit ${offset}, ${perPage}`,
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
    return dsKH();
  }
  demKH(maKH = "", tenKH = "") {
    if (maKH || tenKH) {
      const count = () => {
        return new Promise((resolve, reject) => {
          con.query(
            `select count(*) as count from khoa_hoc where TEN_KH = "%${tenKH}%" or MA_KH = "${maKH}"`,
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
          con.query(`select count(*) as count from khoa_hoc `, (err, kq) => {
            if (err) {
              reject(0);
            } else {
              resolve(kq[0].count);
            }
          });
        });
      };
      return count();
    }
  }
  timkiemKH(offset, perPage, maKH, tenKH) {
    const timkiem = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `SELECT * from khoa_hoc where TEN_KH = "%${tenKH}%" or MA_KH = "${maKH}" Limit ${offset}, ${perPage}`,
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

  themkhoahoc(maKH, tenKH) {
    const khoahoc = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `INSERT INTO khoa_hoc (MA_KH, TEN_KH) VALUES ('${maKH}','${tenKH}')`,
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
    return khoahoc();
  }
  capnhatkhoahoc(maKH, tenKH, old) {
    const khoahoc = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `UPDATE khoa_hoc SET MA_KH='${maKH}',TEN_KH='${tenKH}' WHERE MA_KH = '${old}'`,
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
    return khoahoc();
  }
  xoakhoahoc(maKH) {
    const kq = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `DELETE FROM khoa_hoc WHERE MA_KH='${maKH}'`,
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(1);
            }
          }
        );
      });
    };
    return kq();
  }

  moDangKy(maKH, tgBD, tgKT, hocphi, tt) {
    const moDK = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `INSERT INTO mo_dang_ky (MA_KH, TG_BD, TG_KT, HOC_PHI, TINH_TRANG) VALUES ('${maKH}','${tgBD}','${tgKT}','${hocphi}','${tt}')`,
          (err, kq) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(1);
            }
          }
        );
      });
    };
    return moDK();
  }
}

module.exports = KhoaHoc;
