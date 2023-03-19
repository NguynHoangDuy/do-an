const con = require("../../config/db");
class ChiNhanh {
  async xemChiNhanh() {
    const chinhanh = () => {
      return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM chi_nhanh`, (err, kq) => {
          if (err) {
            reject(err);
          } else {
            resolve(kq);
          }
        });
      });
    };
    return chinhanh();
  }
}

module.exports = ChiNhanh;
