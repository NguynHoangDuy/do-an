const db = require("../../config/db");
class ThoiKhoaBieu {
    themTKB(tkb) {
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

    xoaTKB(tkb) {
        const query = `DELETE FROM thoi_khoa_bieu WHERE MA_LOP=? and MA_THU=? and MA_TG=? and MA_PHONG=?`;
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
}

module.exports = ThoiKhoaBieu;
