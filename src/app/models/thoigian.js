const con = require("../../config/db");
class ThoiGian {
    getThoiGian() {
        return new Promise((resolve, reject) => {
            con.query(
                "SELECT `MA_TG`, `TG_BD`, `TG_KT` FROM `thoi_gian`",
                (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                }
            );
        });
    }
}

module.exports = ThoiGian;
