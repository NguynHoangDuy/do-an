const db = require("../../config/db");

exports.getThangHP = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT EXTRACT(MONTH FROM danh_sach_hoc_vien_lop.NGAY_DONG) AS THANG
        FROM danh_sach_hoc_vien_lop
        WHERE EXTRACT(MONTH FROM danh_sach_hoc_vien_lop.NGAY_DONG) # NULL
        GROUP BY THANG`,
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
exports.getNamHP = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT EXTRACT(YEAR FROM danh_sach_hoc_vien_lop.NGAY_DONG) AS NAM
            FROM danh_sach_hoc_vien_lop
            WHERE EXTRACT(YEAR FROM danh_sach_hoc_vien_lop.NGAY_DONG) # NULL
            GROUP BY NAM`,
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
exports.getListHocPhi = (offset, perPage, THANG, NAM, cn) => {
    let chiNhanh;
    if (cn) {
        chiNhanh = `and mo_dang_ky.MA_CHI_NHANH = '${cn}'`;
    } else {
        chiNhanh = ``;
    }
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT hoc_vien.MA_HV ,hoc_vien.HO_TEN, khoa_hoc.TEN_KH, lop.TEN_LOP, mo_dang_ky.HOC_PHI, mo_dang_ky.MA_CHI_NHANH FROM danh_sach_hoc_vien_lop INNER JOIN hoc_vien on hoc_vien.MA_HV = danh_sach_hoc_vien_lop.MA_HV INNER JOIN lop on lop.MA_LOP = danh_sach_hoc_vien_lop.MA_LOP INNER JOIN mo_dang_ky on mo_dang_ky.MA_KHCC = lop.MA_KHCC INNER JOIN khoa_hoc on mo_dang_ky.MA_KH = khoa_hoc.MA_KH WHERE EXTRACT(YEAR FROM danh_sach_hoc_vien_lop.NGAY_DONG) = "${NAM}" AND EXTRACT(MONTH FROM danh_sach_hoc_vien_lop.NGAY_DONG) = "${THANG}" ${chiNhanh} Limit ${offset}, ${perPage}`,
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
exports.getListHocPhiEx = ( THANG, NAM, cn) => {
    let chiNhanh;
    if (cn) {
        chiNhanh = `and mo_dang_ky.MA_CHI_NHANH = '${cn}'`;
    } else {
        chiNhanh = ``;
    }
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT hoc_vien.MA_HV ,hoc_vien.HO_TEN,mo_dang_ky.MA_CHI_NHANH ,khoa_hoc.TEN_KH, lop.TEN_LOP, mo_dang_ky.HOC_PHI FROM danh_sach_hoc_vien_lop INNER JOIN hoc_vien on hoc_vien.MA_HV = danh_sach_hoc_vien_lop.MA_HV INNER JOIN lop on lop.MA_LOP = danh_sach_hoc_vien_lop.MA_LOP INNER JOIN mo_dang_ky on mo_dang_ky.MA_KHCC = lop.MA_KHCC INNER JOIN khoa_hoc on mo_dang_ky.MA_KH = khoa_hoc.MA_KH WHERE EXTRACT(YEAR FROM danh_sach_hoc_vien_lop.NGAY_DONG) = "${NAM}" AND EXTRACT(MONTH FROM danh_sach_hoc_vien_lop.NGAY_DONG) = "${THANG}" ${chiNhanh}`,
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
exports.countListHP = (THANG, NAM, cn) => {
    let chiNhanh;
    if (cn) {
        chiNhanh = `and mo_dang_ky.MA_CHI_NHANH = '${cn}'`;
    } else {
        chiNhanh = ``;
    }
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT COUNT(*) as DEM FROM danh_sach_hoc_vien_lop INNER JOIN hoc_vien on hoc_vien.MA_HV = danh_sach_hoc_vien_lop.MA_HV INNER JOIN lop on lop.MA_LOP = danh_sach_hoc_vien_lop.MA_LOP INNER JOIN mo_dang_ky on mo_dang_ky.MA_KHCC = lop.MA_KHCC INNER JOIN khoa_hoc on mo_dang_ky.MA_KH = khoa_hoc.MA_KH WHERE EXTRACT(YEAR FROM danh_sach_hoc_vien_lop.NGAY_DONG) = "${NAM}" AND EXTRACT(MONTH FROM danh_sach_hoc_vien_lop.NGAY_DONG) = "${THANG}" ${chiNhanh}`,
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res[0].DEM);
                }
            }
        );
    });
};
exports.getTongHP = (THANG, NAM, cn) => {
    let chiNhanh;
    if (cn) {
        chiNhanh = `and mo_dang_ky.MA_CHI_NHANH = '${cn}'`;
    } else {
        chiNhanh = ``;
    }
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT SUM(mo_dang_ky.HOC_PHI) as TONG FROM danh_sach_hoc_vien_lop INNER JOIN hoc_vien on hoc_vien.MA_HV = danh_sach_hoc_vien_lop.MA_HV INNER JOIN lop on lop.MA_LOP = danh_sach_hoc_vien_lop.MA_LOP INNER JOIN mo_dang_ky on mo_dang_ky.MA_KHCC = lop.MA_KHCC INNER JOIN khoa_hoc on mo_dang_ky.MA_KH = khoa_hoc.MA_KH WHERE EXTRACT(YEAR FROM danh_sach_hoc_vien_lop.NGAY_DONG) = "${NAM}" AND EXTRACT(MONTH FROM danh_sach_hoc_vien_lop.NGAY_DONG) = "${THANG}" ${chiNhanh}`,
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res[0].TONG);
                }
            }
        );
    });
};

exports.getSumHocPhi = (NAM, cn) => {
    let chiNhanh;
    if (cn) {
        chiNhanh = `and mo_dang_ky.MA_CHI_NHANH = '${cn}'`;
    } else {
        chiNhanh = ``;
    }
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT month.THANG, TONG FROM (SELECT 1 AS THANG
                UNION ALL
                SELECT 2
                UNION ALL
                SELECT 3
                UNION ALL
                SELECT 4
                UNION ALL
                SELECT 5
                UNION ALL
                SELECT 6
                UNION ALL
                SELECT 7
                UNION ALL
                SELECT 8
                UNION ALL
                SELECT 9
                UNION ALL
                SELECT 10
                UNION ALL
                SELECT 11
                UNION ALL
                SELECT 12
                ) as month LEFT JOIN (SELECT SUM(mo_dang_ky.HOC_PHI) as TONG, EXTRACT(MONTH FROM danh_sach_hoc_vien_lop.NGAY_DONG) as THANG FROM danh_sach_hoc_vien_lop INNER JOIN hoc_vien on hoc_vien.MA_HV = danh_sach_hoc_vien_lop.MA_HV INNER JOIN lop on lop.MA_LOP = danh_sach_hoc_vien_lop.MA_LOP INNER JOIN mo_dang_ky on mo_dang_ky.MA_KHCC = lop.MA_KHCC INNER JOIN khoa_hoc on mo_dang_ky.MA_KH = khoa_hoc.MA_KH WHERE EXTRACT(YEAR FROM danh_sach_hoc_vien_lop.NGAY_DONG) = ${NAM} ${chiNhanh}
                GROUP BY EXTRACT(MONTH FROM danh_sach_hoc_vien_lop.NGAY_DONG)
                ) as money ON month.THANG = money.THANG`,
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
exports.getNamHv = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT EXTRACT(YEAR FROM hoc_vien.NGAY) AS NAM
        FROM hoc_vien
        GROUP BY NAM`,
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
exports.tkHocVien = (NAM, cn) => {
    let chiNhanh;
    if (cn) {
        chiNhanh = `and mo_dang_ky.MA_CHI_NHANH = '${cn}'`;
    } else {
        chiNhanh = ``;
    }
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT month.THANG, TONG FROM (SELECT 1 AS THANG
                UNION ALL
                SELECT 2
                UNION ALL
                SELECT 3
                UNION ALL
                SELECT 4
                UNION ALL
                SELECT 5
                UNION ALL
                SELECT 6
                UNION ALL
                SELECT 7
                UNION ALL
                SELECT 8
                UNION ALL
                SELECT 9
                UNION ALL
                SELECT 10
                UNION ALL
                SELECT 11
                UNION ALL
                SELECT 12
                ) as month LEFT JOIN (SELECT COUNT(hoc_vien.MA_HV) as TONG, EXTRACT(MONTH FROM hoc_vien.NGAY) as THANG FROM hoc_vien WHERE EXTRACT(YEAR FROM hoc_vien.NGAY) = "${NAM}" ${chiNhanh}
                GROUP BY EXTRACT(MONTH FROM hoc_vien.NGAY)
                ) as hv ON month.THANG = hv.THANG`,
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
