const con = require("../../config/db");

class GiaoVien {
  constructor(ma_gv) {
    this.ma_gv = ma_gv;
  }
  async demGv() {
    const count = () => {
      return new Promise((resolve, reject) => {
        con.query("select count(*) as count from giao_vien", (err, kq) => {
          if (err) {
            reject(0);
          } else {
            resolve(kq[0].count);
          }
        });
      });
    };
    return await count();
  }
  async getAllGv(offset, perPage) {
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
    return await gv();
  }
  async layMaGV() {
    const magv = () => {
      return new Promise((resolve, reject) => {
        con.query("SELECT MAX(MA_GV) as MA_HV FROM giao_vien", (err, id) => {
          if (err) {
            reject(0);
          } else {
            const countMaHV = parseInt(id[0].MA_GV.substr(5)) + 1;
            const mahv = "ALFGV" + String(countMaHV).padStart(5, "0");
            resolve(mahv);
          }
        });
      });
    };
    return await magv();
  }
  async themgiaovien(
    ma_gv,
    ho_ten,
    gt,
    ngaysinh,
    sdt,
    diachi,
    email,
    matkhau,
    anh_dd
  ) {
    let kqThem = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `INSERT INTO giao_vien (MA_GV, MA_QUYEN, HO_TEN, GIOI_TINH, NGAY_SINH, SDT, DIA_CHI, EMAIL, MAT_KHAU, ANH_DD) VALUES ('${ma_gv}','GV','${ho_ten}','${gt}','${ngaysinh}','${sdt}','${diachi}','${email}','${matkhau}','${anh_dd}'`,
          (err, result) => {
            if (err) {
              reject(0);
            } else {
              resolve(1);
            }
          }
        );
      });
    };
    return await kqThem();
  }

  async xemthongtin(ma_gv) {
    let kq = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `SELECT * FROM giao_vien where MA_GV = '${ma_gv}'`,
          (err, dt) => {
            if (err) {
              reject([]);
            } else {
              if (dt.length !== 0) {
                resolve(dt);
              } else {
                resolve([]);
              }
            }
          }
        );
      });
    };
    return await kq();
  }
  async capnhatgiaovien(
    ma_gv,
    ho_ten,
    gt,
    ngaysinh,
    sdt,
    diachi,
    email,
    anh_dd
  ) {
    let kq = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `UPDATE giao_vien SET HO_TEN='${ho_ten}',GIOI_TINH='${gt}',NGAY_SINH='${ngaysinh}',SDT='${sdt}',DIA_CHI='${diachi}',EMAIL='${email}', ,ANH_DD='${anh_dd}' WHERE MA_HV='${ma_gv}'`,
          (err, dt) => {
            if (err) {
              reject(0);
            } else {
              resolve(1);
            }
          }
        );
      });
    };
    return await kq();
  }

  async xoahocvien(magv) {
    const kq = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `DELETE FROM giao_vien WHERE MA_HV='${magv}'`,
          (err, result) => {
            if (err) {
              reject(0);
            } else {
              resolve(1);
            }
          }
        );
      });
    };
    return await kq();
  }
}

module.exports = GiaoVien;
