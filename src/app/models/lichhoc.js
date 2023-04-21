const con = require("../../config/db");
class LichHoc {
    getLichHoc() {
        return new Promise((resolve, reject) => {
            con.query("SELECT MA_THU, TEN_THU FROM lich_hoc", (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }
}

module.exports = LichHoc;
