const db = require("../../config/db");
class Lop {
    themLop(tkb) {
        const query = `INSERT INTO thoi_khoa_bieu SET ?`;
        return new Promise((resolve, reject) => {
            db.query(query, tkb, (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results.insertId);
            });
        });
    }

    xoaLop(tkb) {
        const query = `DELETE FROM thoi_khoa_bieu WHERE MA_LOP=?, MA_THU=?, MA_TG=?, MA_PHONG=?`;
        const { MA_LOP, MA_THU, MA_TG, MA_PHONG } = tkb;
        return new Promise((resolve, reject) => {
            db.query(
                query,
                [MA_LOP, MA_THU, MA_TG, MA_PHONG],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(1);
                }
            );
        });
    }

    capNhatLop(tkbOld, tkbNew) {
        const query = `UPDATE lop SET ?  MA_LOP=?, MA_THU=?, MA_TG=?, MA_PHONG=?`;
        const { MA_LOP, MA_THU, MA_TG, MA_PHONG } = tkbOld;
        return new Promise((resolve, reject) => {
            db.query(
                query,
                [tkbNew, MA_LOP, MA_THU, MA_TG, MA_PHONG],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(1);
                }
            );
        });
    }
}

module.exports = Lop;
