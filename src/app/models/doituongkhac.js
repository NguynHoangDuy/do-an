const con = require("../../config/db");
class DoiTuongKhac {
  constructor(mahv, cv) {
    (this.mahv = mahv), (this.cv = cv);
  }

  async themdtk(mahv, cv) {
    let kq = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `INSERT INTO doi_tuong_khac (MA_HV, CV) VALUES ('${mahv}','${cv}')`,
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

module.exports = DoiTuongKhac;
