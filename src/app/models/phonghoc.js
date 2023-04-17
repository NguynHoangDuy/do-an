const db = require("../../config/db");

class PhongHoc {
    getPhonghocByCn(cn) {
        return new Promise((resolve, reject) => {
            const query = `SELECT MA_PHONG, TEN_PHONG FROM phong_hoc WHERE MA_CHI_NHANH = '${cn}'`;
            db.query(query, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }
}

module.exports = PhongHoc;
