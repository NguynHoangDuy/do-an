const db = require("../../config/db");
class Lop {
    themLop(lop) {
        const query = `INSERT INTO lop SET ?`;
        return new Promise((resolve, reject) => {
            db.query(query, lop, (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results.insertId);
            });
        });
    }

    xoaLop(maLop) {
        const query = `DELETE FROM lop WHERE MA_LOP = ?`;

        return new Promise((resolve, reject) => {
            db.query(query, maLop, (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(1);
            });
        });
    }

    capNhatLop(lop, maLop) {
        const query = `UPDATE lop SET ? WHERE MA_LOP = ?`;

        return new Promise((resolve, reject) => {
            db.query(query, [lop, maLop], (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(1);
            });
        });
    }
}

module.exports = Lop;
