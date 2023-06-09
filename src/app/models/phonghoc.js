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

    getListPhongHoc(maCN) {
        let chiNhanh;
        if (maCN) {
            chiNhanh = `Where MA_CHI_NHANH = '${maCN}'`;
        } else {
            chiNhanh = ``;
        }
        return new Promise((resolve, reject) => {
            db.query(`Select * from phong_hoc ${chiNhanh}`, (err, res) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(res)
                }
            })
        })
    }

    them(ma, ten, cn) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO phong_hoc(MA_PHONG, TEN_PHONG, MA_CHI_NHANH) VALUES ('${ma}','${ten}','${cn}')`, (err, res) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(1)
                }
            })
        })
    }
    capnhat(ma, ten, cn, old) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE phong_hoc SET MA_PHONG='${ma}',TEN_PHONG='${ten}',MA_CHI_NHANH='${cn}' WHERE MA_PHONG='${old}'`, (err, res) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(1)
                }
            })
        })
    }
    xoa(old) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM phong_hoc WHERE MA_PHONG='${old}'`, (err, res) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(1)
                }
            })
        })
    }
}

module.exports = PhongHoc;
