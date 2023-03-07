const con = require("../../config/db");
class SinhVien {
  constructor(mahv, nganh, truongdh) {
    (this.mahv = mahv), (this.nganh = nganh), (this.truongdh = truongdh);
  }

  async themsinhvien(mahv, nganh, truong) {
    let kq = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `INSERT INTO sinh_vien (MA_HV, NGANH, TRUONG) VALUES ('${mahv}','${nganh}','${truong}')`,
          (err, result) => {
            if (err) {
              reject(err);
            } else resolve(result);
          }
        );
      });
    };

    return await kq();
  }
}

module.exports = SinhVien;
