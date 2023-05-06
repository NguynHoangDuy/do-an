const db = require("../../config/db");
exports.getListHour = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT lop.MA_GV, SUM(TIMESTAMPDIFF(HOUR, thoi_gian.TG_BD,  thoi_gian.TG_KT)) as GIO_LAM_VIEC
        FROM thoi_khoa_bieu INNER JOIN lop ON lop.MA_LOP = thoi_khoa_bieu.MA_LOP
        INNER JOIN thoi_gian ON thoi_gian.MA_TG = thoi_khoa_bieu.MA_TG
        INNER JOIN mo_dang_ky on mo_dang_ky.MA_KHCC = lop.MA_KHCC
        INNER JOIN (SELECT DATE_FORMAT(date_range.date, '%Y-%m-%d') AS ngay,
               CASE DAYOFWEEK(date_range.date)
                   WHEN 2 THEN 'T2'
                   WHEN 3 THEN 'T3'
                   WHEN 4 THEN 'T4'
                   WHEN 5 THEN 'T5'
                   WHEN 6 THEN 'T6'
                   WHEN 7 THEN 'T7'
               END AS THU
        FROM (
          SELECT ADDDATE(DATE_FORMAT(NOW(), '%Y-%m-01'), INTERVAL (numbers.n - 1) DAY) AS date
          FROM (
            SELECT 1 AS n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24 UNION SELECT 25 UNION SELECT 26 UNION SELECT 27 UNION SELECT 28 UNION SELECT 29 UNION SELECT 30 UNION SELECT 31
          ) AS numbers
          WHERE DATE_FORMAT(ADDDATE(DATE_FORMAT(NOW(), '%Y-%m-01'), INTERVAL (numbers.n - 1) DAY), '%m') = DATE_FORMAT(NOW(), '%m')
        ) AS date_range) as tgNgay ON tgNgay.THU = thoi_khoa_bieu.MA_THU
        WHERE mo_dang_ky.TG_BD <= ngay AND DATE_ADD(mo_dang_ky.TG_BD, INTERVAL mo_dang_ky.TG_KT MONTH) >= ngay
        GROUP BY lop.MA_GV`,
            (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    resolve([]);
                } else {
                    resolve(res);
                }
            }
        );
    });
};

exports.getHeSoLuong = (magv) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT HE_SO FROM he_so_luong WHERE MA_GV = "${magv}"`,
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res[0].HE_SO);
                }
            }
        );
    });
};

exports.getListLuong = (THANG, NAM, cn) => {
    let chiNhanh;
    if (cn) {
        chiNhanh = `and MA_CHI_NHANH = '${cn}'`;
    } else {
        chiNhanh = ``;
    }
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT giao_vien.HO_TEN, MA_CHI_NHANH, giao_vien.SDT, GIO, he_so_luong.HE_SO, BHYT, BHXH, TIEN_LUONG,THUC_NHAN FROM luong INNER JOIN giao_vien ON luong.MA_GV = giao_vien.MA_GV INNER JOIN he_so_luong ON he_so_luong.MA_GV = luong.MA_GV WHERE THANG = "${THANG}" AND NAM= "${NAM}" ${chiNhanh}`,
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }
        );
    });
};

exports.getLuongGV = (THANG, NAM, magv) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT giao_vien.HO_TEN, MA_CHI_NHANH, giao_vien.SDT, GIO, he_so_luong.HE_SO, BHYT, BHXH, TIEN_LUONG,THUC_NHAN FROM luong INNER JOIN giao_vien ON luong.MA_GV = giao_vien.MA_GV INNER JOIN he_so_luong ON he_so_luong.MA_GV = luong.MA_GV WHERE THANG = "${THANG}" AND NAM= "${NAM}" AND luong.MA_GV = "${magv}"`,
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res[0]);
                }
            }
        );
    });
};

exports.themLuong = (luong) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO luong SET ?", luong, (err, kq) => {
            if (err) {
                reject(err);
            } else {
                resolve(1);
            }
        });
    });
};

exports.getNam = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT NAM FROM luong GROUP BY NAM`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};
exports.getThang = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT THANG FROM luong GROUP BY THANG`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};
