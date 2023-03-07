const con = require("../../config/db");
const DoiTuongKhac = require("./doituongkhac");
const HocSinh = require("./hocsinh");
const SinhVien = require("./sinhvien");

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
          `INSERT INTO hoc_vien (MA_HV, MA_QUYEN, HO_TEN, GIOI_TINH, NGAY_SINH, SDT, DIA_CHI, EMAIL, MAT_KHAU, DOI_TUONG) VALUES ('${ma_hv}','HV','${ho_ten}','${gt}','${ngaysinh}','${sdt}','${diachi}','${email}','${matkhau}','${dt}')`,
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              if (dt === "HS") {
                const hs = new HocSinh(ma_hv, lop, truong, phuhuynh, sdtph);
                const kq = hs.themhocsinh(ma_hv, lop, truong, phuhuynh, sdtph);
                resolve(kq);
              } else if (dt === "SV") {
                const sv = new SinhVien(ma_hv, nganh, truongdh);
                const kq = sv.themsinhvien(ma_hv, nganh, truongdh);
                resolve(kq);
              } else {
                const dt = new DoiTuongKhac(ma_hv, cv);
                const kq = dt.themdtk(ma_hv, cv);
                resolve(kq);
              }
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
          `SELECT DOI_TUONG FROM hoc_vien where MA_HV = '${ma_hv}'`,
          (err, dt) => {
            if (err) {
              console.log(err);
            } else {
              let query = "";
              if (dt[0].DOI_TUONG === "HS") {
                query = `SELECT * FROM hoc_vien
              INNER JOIN hoc_sinh ON hoc_vien.MA_HV = hoc_sinh.MA_HV WHERE hoc_vien.MA_HV  = '${ma_hv}'`;
              } else if (dt[0].DOI_TUONG === "SV") {
                query = `SELECT * FROM hoc_vien
              INNER JOIN sinh_vien ON hoc_vien.MA_HV = sinh_vien.MA_HV 
              WHERE hoc_vien.MA_HV = '${ma_hv}'`;
              } else {
                query = `SELECT * FROM hoc_vien
              INNER JOIN doi_tuong_khac ON hoc_vien.MA_HV = doi_tuong_khac.MA_HV 
              WHERE hoc_vien.MA_HV = '${ma_hv}'`;
              }
              con.query(query, (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              });
            }
          }
        );
      });
    };
    return await kq();
  }
}

module.exports = HocVien;
