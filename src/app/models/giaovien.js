const con = require("../../config/db");

class GiaoVien {
  constructor(ma_gv) {
    this.ma_gv = ma_gv;
  }
  demGv(ho_ten) {
    const count = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `select count(*) as count from giao_vien where HO_TEN like "%${ho_ten}%"`,
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
  getAllGv(offset, perPage) {
    const gv = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `Select * from giao_vien Limit ${offset}, ${perPage}`,
          (err, kq) => {
            if (err) {
              reject([]);
            } else {
              if (kq.length !== 0) resolve(kq);
              else resolve([]);
            }
          }
        );
      });
    };
    return gv();
  }
  timkiemGiaoVien(offset, perPage, hoten) {
    const gv = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `Select * from giao_vien where HO_TEN like "%${hoten}%" Limit ${offset}, ${perPage}`,
          (err, kq) => {
            if (err) {
              con;
              resolve([]);
            } else {
              if (kq.length !== 0) resolve(kq);
              else resolve([]);
            }
          }
        );
      });
    };
    return gv();
  }
  layMaGV() {
    const magv = () => {
      return new Promise((resolve, reject) => {
        con.query("SELECT MAX(MA_GV) as MA_GV FROM giao_vien", (err, id) => {
          if (err) {
            reject(0);
          } else {
            const countMaGV = parseInt(id[0].MA_GV.substr(5)) + 1;
            const mahv = "ALFGV" + String(countMaGV).padStart(3, "0");
            resolve(mahv);
          }
        });
      });
    };
    return magv();
  }
  themgiaovien(
    ma_gv,
    ho_ten,
    gt,
    ngaysinh,
    sdt,
    diachi,
    email,
    matkhau,
    trinhdo,
    anh_dd
  ) {
    let kqThem = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `INSERT INTO giao_vien (MA_GV, MA_QUYEN, HO_TEN, GIOI_TINH, NGAY_SINH, SDT, DIA_CHI, EMAIL, MAT_KHAU, TRINH_DO, ANH_DD) VALUES ('${ma_gv}','GV','${ho_ten}','${gt}','${ngaysinh}','${sdt}','${diachi}','${email}','${matkhau}','${trinhdo}','${anh_dd}')`,
          (err, result) => {
            if (err) {
              resolve(0);
            } else {
              resolve(1);
            }
          }
        );
      });
    };
    return kqThem();
  }

  xemthongtin(ma_gv) {
    let kq = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `SELECT * FROM giao_vien where MA_GV = '${ma_gv}'`,
          (err, dt) => {
            if (err) {
              resolve(0);
            } else {
              if (dt.length !== 0) {
                resolve(dt[0]);
              } else {
                resolve(0);
              }
            }
          }
        );
      });
    };
    return kq();
  }
  capnhatgiaovien(
    ma_gv,
    ho_ten,
    gt,
    ngaysinh,
    sdt,
    diachi,
    email,
    trinhdo,
    anh_dd
  ) {
    let kq = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `UPDATE giao_vien SET HO_TEN='${ho_ten}',GIOI_TINH='${gt}',NGAY_SINH='${ngaysinh}',SDT='${sdt}',DIA_CHI='${diachi}',EMAIL='${email}', ANH_DD='${anh_dd}', TRINH_DO='${trinhdo}' WHERE MA_GV='${ma_gv}'`,
          (err, dt) => {
            if (err) {
              resolve(0);
            } else {
              resolve(1);
            }
          }
        );
      });
    };
    return kq();
  }

  xoagiaovien(magv) {
    const kq = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `DELETE FROM giao_vien WHERE MA_GV='${magv}'`,
          (err, result) => {
            if (err) {
              resolve(0);
            } else {
              resolve(1);
            }
          }
        );
      });
    };
    return kq();
  }

  resetMK(ma_gv, mk) {
    let kq = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `UPDATE giao_vien SET MAT_KHAU='${mk}' WHERE MA_GV='${ma_gv}'`,
          (err, dt) => {
            if (err) {
              resolve(0);
            } else {
              resolve(1);
            }
          }
        );
      });
    };
    return kq();
  }
}

module.exports = GiaoVien;
