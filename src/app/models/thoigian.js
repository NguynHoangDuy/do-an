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

    getThoiGianGv(maGv, maThu) {
        return new Promise((resolve, reject) => {
            con.query(
                `SELECT * FROM thoi_gian WHERE thoi_gian.MA_TG not in (SELECT thoi_khoa_bieu.MA_TG FROM thoi_khoa_bieu INNER JOIN thoi_gian ON thoi_khoa_bieu.MA_TG = thoi_gian.MA_TG INNER JOIN lop ON lop.MA_LOP = thoi_khoa_bieu.MA_LOP INNER JOIN mo_dang_ky ON lop.MA_KHCC = mo_dang_ky.MA_KHCC WHERE thoi_khoa_bieu.MA_THU = '${maThu}' AND mo_dang_ky.TINH_TRANG = 1 AND lop.MA_GV = "${maGv}")`,
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
