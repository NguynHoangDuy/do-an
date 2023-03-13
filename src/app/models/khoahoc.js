const con = require("../../config/db");
class KhoaHoc {
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
  async demKH(maKH = "", tenKH = "") {
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

  themkhoahoc(maKH, tenKH, hocPhi) {
    const khoahoc = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `INSERT INTO khoa_hoc (MA_KH, TEN_KH, HOC_PHI) VALUES ('${maKH}','${tenKH}','${hocPhi}')`,
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
  capnhatkhoahoc(maKH, tenKH, hocPhi, old) {
    const khoahoc = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `UPDATE khoa_hoc SET MA_KH='${maKH}',TEN_KH='${tenKH}',HOC_PHI='${hocPhi}' WHERE MA_KH = '${old}'`,
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

  moDangKy(maKH, tgBD, tgKT, tt) {
    const moDK = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `INSERT INTO dang_ky_khoa_hoc (MA_KH, TG_BD, TG_KT, TINH_TRANG) VALUES ('${maKH}','${tgBD}','${tgKT}','${tt}')`,
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
