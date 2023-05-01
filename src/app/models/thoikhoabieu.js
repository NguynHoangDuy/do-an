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
    getTKbHV(mahv) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT TEN_LOP, MA_THU, MA_TG, phong_hoc.TEN_PHONG FROM thoi_khoa_bieu INNER JOIN lop on lop.MA_LOP = thoi_khoa_bieu.MA_LOP INNER JOIN mo_dang_ky on mo_dang_ky.MA_KHCC = lop.MA_KHCC INNER JOIN danh_sach_hoc_vien_lop on danh_sach_hoc_vien_lop.MA_LOP = thoi_khoa_bieu.MA_LOP INNER JOIN phong_hoc on phong_hoc.MA_PHONG = thoi_khoa_bieu.MA_PHONG WHERE mo_dang_ky.TINH_TRANG = 1 AND danh_sach_hoc_vien_lop.MA_HV = "${mahv}"`,
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                }
            );
        });
    }
}

module.exports = ThoiKhoaBieu;
