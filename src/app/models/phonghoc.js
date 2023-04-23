const db = require("../../config/db");

class PhongHoc {
    getPhonghocByCn(cn, thu, tgbd, tgkt) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM phong_hoc
            WHERE phong_hoc.MA_PHONG NOT IN (SELECT thoi_khoa_bieu.MA_PHONG FROM thoi_khoa_bieu INNER JOIN thoi_gian ON thoi_khoa_bieu.MA_TG = thoi_gian.MA_TG INNER JOIN lop ON lop.MA_LOP = thoi_khoa_bieu.MA_LOP INNER JOIN mo_dang_ky ON lop.MA_KHCC = mo_dang_ky.MA_KHCC WHERE thoi_khoa_bieu.MA_THU = '${thu}' AND mo_dang_ky.TINH_TRANG = 1 AND ((thoi_gian.TG_BD = '${tgbd}' AND thoi_gian.TG_KT = '${tgkt}')
                    OR (thoi_gian.TG_BD <= '${tgbd}' AND thoi_gian.TG_KT >= '${tgkt}')
                    OR (thoi_gian.TG_BD >= '${tgbd}' AND thoi_gian.TG_BD < '${tgkt}')
                    OR (thoi_gian.TG_KT > '${tgbd}' AND thoi_gian.TG_KT <= '${tgkt}'))) AND MA_CHI_NHANH = "${cn}"`;
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
