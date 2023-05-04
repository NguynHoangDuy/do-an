const db = require("../../config/db");
class Lop {
    themLop(lop) {
        const query = `INSERT INTO lop SET ?`;
        return new Promise((resolve, reject) => {
            db.query(query, lop, (error, results) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else resolve(results.insertId);
            });
        });
    }

    xoaLop(maLop) {
        const query = `UPDATE lop SET XOA = "1" WHERE MA_LOP = ?`;

        return new Promise((resolve, reject) => {
            db.query(query, maLop, (error, results) => {
                if (error) {
                    reject(error);
                } else resolve(1);
            });
        });
    }

    capNhatLop(MA_GV, SO_LUONG, maLop) {
        const query = `UPDATE lop SET MA_GV = ?, SO_LUONG = ? WHERE MA_LOP = ?`;

        return new Promise((resolve, reject) => {
            db.query(query, [MA_GV, SO_LUONG, maLop], (error, results) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else resolve(1);
            });
        });
    }

    hocVien(offset, perPage, malop) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT lop.MA_LOP, hoc_vien.MA_HV, lop.TEN_LOP, hoc_vien.HO_TEN, hoc_vien.SDT, HOC_PHI FROM danh_sach_hoc_vien_lop INNER JOIN hoc_vien ON danh_sach_hoc_vien_lop.MA_HV = hoc_vien.MA_HV INNER JOIN lop on lop.MA_LOP = danh_sach_hoc_vien_lop.MA_LOP  WHERE lop.MA_LOP = "${malop}"  Limit ${offset}, ${perPage}`,
                (error, res) => {
                    if (error) {
                        reject(error);
                    } else resolve(res);
                }
            );
        });
    }
    demHocVien(malop) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT  COUNT(*) as DEM FROM danh_sach_hoc_vien_lop INNER JOIN hoc_vien ON danh_sach_hoc_vien_lop.MA_HV = hoc_vien.MA_HV INNER JOIN lop on lop.MA_LOP = danh_sach_hoc_vien_lop.MA_LOP  WHERE lop.MA_LOP = "${malop}"`,
                (error, res) => {
                    if (error) {
                        reject(error);
                    } else resolve(res[0].DEM);
                }
            );
        });
    }
    timKiemHV(malop, mahv, tenhv) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT lop.MA_LOP, hoc_vien.MA_HV, lop.TEN_LOP, hoc_vien.HO_TEN, hoc_vien.SDT, HOC_PHI FROM danh_sach_hoc_vien_lop INNER JOIN hoc_vien ON danh_sach_hoc_vien_lop.MA_HV = hoc_vien.MA_HV INNER JOIN lop on lop.MA_LOP = danh_sach_hoc_vien_lop.MA_LOP  WHERE lop.MA_LOP = "${malop}" AND (hoc_vien.MA_HV = "${mahv}" OR hoc_vien.HO_TEN like "%${tenhv}%")`,
                (error, res) => {
                    if (error) {
                        reject(error);
                    } else resolve(res);
                }
            );
        });
    }

    themHocVien(malop, mahv) {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO danh_sach_hoc_vien_lop(MA_HV, MA_LOP, HOC_PHI) VALUES ('${mahv}','${malop}','0')`,
                (error, res) => {
                    if (error) {
                        reject(error);
                    } else resolve(1);
                }
            );
        });
    }

    xoaLop(malop, mahv) {
        return new Promise((resolve, reject) => {
            db.query(
                `DELETE FROM danh_sach_hoc_vien_lop
                WHERE MA_HV = "${mahv}"
                AND MA_LOP IN (SELECT MA_LOP FROM lop WHERE MA_KHCC = (SELECT MA_KHCC FROM lop WHERE MA_LOP = "${malop}"))`,
                (error, res) => {
                    if (error) {
                        reject(error);
                    } else resolve(1);
                }
            );
        });
    }
    xoaHocVienLop(tenlop, mahv) {
        return new Promise((resolve, reject) => {
            db.query(
                `DELETE FROM danh_sach_hoc_vien_lop WHERE MA_HV = "${mahv}" AND MA_LOP IN (SELECT MA_LOP FROM lop WHERE TEN_LOP ="${tenlop}")`,
                (error, res) => {
                    if (error) {
                        reject(error);
                    } else resolve(1);
                }
            );
        });
    }
    xoaHocVien(malop, mahv) {
        return new Promise((resolve, reject) => {
            db.query(
                `DELETE FROM danh_sach_hoc_vien_lop WHERE MA_HV = "${mahv}" AND MA_LOP = "${malop}"`,
                (error, res) => {
                    if (error) {
                        reject(error);
                    } else resolve(1);
                }
            );
        });
    }

    hocPhi(malop, mahv) {
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE danh_sach_hoc_vien_lop SET HOC_PHI='1' WHERE  MA_HV = "${mahv}" AND MA_LOP = "${malop}"`,
                (error, res) => {
                    if (error) {
                        reject(error);
                    } else resolve(1);
                }
            );
        });
    }

    xemHocPhi(mahv) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT khoa_hoc.MA_KH, khoa_hoc.TEN_KH, lop.TEN_LOP, mo_dang_ky.HOC_PHI , danh_sach_hoc_vien_lop.HOC_PHI AS DONG, danh_sach_hoc_vien_lop.NGAY_DONG FROM danh_sach_hoc_vien_lop INNER JOIN lop ON danh_sach_hoc_vien_lop.MA_LOP = lop.MA_LOP INNER JOIN mo_dang_ky ON mo_dang_ky.MA_KHCC = lop.MA_KHCC INNER JOIN khoa_hoc on khoa_hoc.MA_KH = mo_dang_ky.MA_KH WHERE MA_HV = "${mahv}" ORDER BY danh_sach_hoc_vien_lop.HOC_PHI`,
                (error, res) => {
                    if (error) {
                        reject(error);
                    } else resolve(res);
                }
            );
        });
    }

    tongHocPhi(mahv) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT SUM(mo_dang_ky.HOC_PHI) AS TONG FROM danh_sach_hoc_vien_lop INNER JOIN lop ON danh_sach_hoc_vien_lop.MA_LOP = lop.MA_LOP INNER JOIN mo_dang_ky ON mo_dang_ky.MA_KHCC = lop.MA_KHCC INNER JOIN khoa_hoc on khoa_hoc.MA_KH = mo_dang_ky.MA_KH WHERE MA_HV = "${mahv}" AND danh_sach_hoc_vien_lop.HOC_PHI = "0"`,
                (error, res) => {
                    if (error) {
                        reject(error);
                    } else resolve(res[0].TONG);
                }
            );
        });
    }
}

module.exports = Lop;
