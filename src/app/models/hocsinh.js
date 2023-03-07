const con = require("../../config/db");
class HocSinh {
  constructor(mahv, lop, truong, phuhuynh, sdtph) {
    (this.mahv = mahv),
      (this.lop = lop),
      (this.truong = truong),
      (this.phuhuynh = phuhuynh),
      (this.sdtph = sdtph);
  }

  async themhocsinh(mahv, lop, truong, phuhuynh, sdtph) {
    let kq = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `INSERT INTO hoc_sinh (MA_HV, LOP, TRUONG, PHU_HUYNH, SDT_PH) VALUES ('${mahv}','${lop}','${truong}','${phuhuynh}','${sdtph}')`,
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

module.exports = HocSinh;
