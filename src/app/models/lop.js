const db = require("../../config/db");
class Lop {
    themLop(lop) {
        const query = `INSERT INTO lop SET ?`;
        return new Promise((resolve, reject) => {
            db.query(query, lop, (error, results) => {
                if (error) {
                    console.log(error)
                    reject(error);
                }
                 resolve(results.insertId);
            });
        });
    }

    xoaLop(maLop) {
        const query = `DELETE FROM lop WHERE MA_LOP = ?`;

        return new Promise((resolve, reject) => {
            db.query(query, maLop, (error, results) => {
                if (error) {
                    reject(error);
                }
                 resolve(1);
            });
        });
    }

    capNhatLop(MA_GV, SO_LUONG, maLop) {
        const query = `UPDATE lop SET MA_GV = ?, SO_LUONG = ? WHERE MA_LOP = ?`;

        return new Promise((resolve, reject) => {
            db.query(query, [MA_GV, SO_LUONG, maLop], (error, results) => {
                if (error) {
                    console.log(error)
                    reject(error);
                }
                 resolve(1);
            });
        });
    }
}

module.exports = Lop;
