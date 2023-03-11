const con = require("../../config/db");

class HocVien {
  constructor(ma_hv, ho_ten, gt, ngaysinh, sdt, diachi, email, matkhau, dt) {
    (this.ma_hv = ma_hv),
      (this.ho_ten = ho_ten),
      (this.gt = gt),
      (this.sdt = sdt),
      (this.ngaysinh = ngaysinh),
      (this.diachi = diachi),
      (this.email = email),
      (this.matkhau = matkhau),
      (this.dt = dt);
  }
  async demHv(hoten, sdt) {
    const count = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `select count(*) as count from hoc_vien where HO_TEN like '%${hoten}%' or SDT='${sdt}'`,
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
    return await count();
  }
  async timkiemHV(offset, perPage, hoten, sdt) {
    const hv = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `Select * from hoc_vien where HO_TEN like '%${hoten}%' or SDT='${sdt}' Limit ${offset}, ${perPage}`,
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
    return await hv();
  }
  async getAllHv(offset, perPage) {
    const hv = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `Select * from hoc_vien Limit ${offset}, ${perPage}`,
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
    return await hv();
  }
  layMaHV() {
    const mahv = () => {
      return new Promise((resolve, reject) => {
        con.query("SELECT MAX(MA_HV) as MA_HV FROM hoc_vien", (err, id) => {
          if (err) {
            reject(err);
          } else {
            const countMaHV = parseInt(id[0].MA_HV.substr(5)) + 1;
            const mahv = "ALFHV" + String(countMaHV).padStart(5, "0");
            // console.log(mahv);
            resolve(mahv);
          }
        });
      });
    };
    return mahv().then((kq) => {
      return kq;
    });
  }
  async themhocvien(
    ma_hv,
    ho_ten,
    gt,
    ngaysinh,
    sdt,
    diachi,
    email,
    matkhau,
    dt,
    lop,
    truong,
    phuhuynh,
    sdtph,
    nganh,
    truongdh,
    cv
  ) {
    let kqThem = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `INSERT INTO hoc_vien (MA_HV, MA_QUYEN, HO_TEN, GIOI_TINH, NGAY_SINH, SDT, DIA_CHI, EMAIL, MAT_KHAU, DOI_TUONG, TINH_TRANG, LOP, TRUONG, PHU_HUYNH, SDT_PH, NGANH, TRUONG_DH, CV) VALUES ('${ma_hv}','HV','${ho_ten}','${gt}','${ngaysinh}','${sdt}','${diachi}','${email}','${matkhau}','${dt}','1', '${lop}',  '${truong}', '${phuhuynh}', '${sdtph}', '${nganh}', '${truongdh}', '${cv}')`,
          (err, result) => {
            if (err) {
              resolve(0);
            } else {
              console.log(result);
              resolve(1);
            }
          }
        );
      });
    };
    return await kqThem();
  }

  async xemthongtin(ma_hv) {
    let kq = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `SELECT * FROM hoc_vien where MA_HV = '${ma_hv}'`,
          (err, dt) => {
            if (err) {
              resolve(0);
            } else {
              if (dt.length !== 0) {
                resolve(dt);
              } else {
                resolve(0);
              }
            }
          }
        );
      });
    };
    return await kq();
  }
  async capnhathocvien(
    ma_hv,
    ho_ten,
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
    tinh_trang
  ) {
    let kq = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `UPDATE hoc_vien SET HO_TEN='${ho_ten}',GIOI_TINH='${gt}',NGAY_SINH='${ngaysinh}',SDT='${sdt}',DIA_CHI='${diachi}',EMAIL='${email}',DOI_TUONG='${dt}',TINH_TRANG='${tinh_trang}', LOP ='${lop}', TRUONG='${truong}', PHU_HUYNH='${phuhuynh}', SDT_PH='${sdtph}', NGANH='${nganh}', TRUONG_DH='${truongdh}', CV='${cv}' WHERE MA_HV='${ma_hv}'`,
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
    return await kq();
  }

  async xoahocvien(mahv) {
    const kq = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `DELETE FROM hoc_vien WHERE MA_HV='${mahv}'`,
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
    return await kq();
  }

  async resetMK(ma_hv, mk) {
    let kq = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `UPDATE hoc_vien SET MAT_KHAU='${mk}' WHERE MA_HV='${ma_hv}'`,
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
    return await kq();
  }
}

module.exports = HocVien;
