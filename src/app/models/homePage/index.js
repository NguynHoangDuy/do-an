const con = require("../../../config/db");

exports.bannerImage = () => {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM `banner_home`", (err, kq) => {
            if (err) {
                reject(err);
            } else {
                resolve(kq);
            }
        });
    });
};
exports.danhMucKh = () => {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM danh_muc_kh", (err, kq) => {
            if (err) {
                reject(err);
            } else {
                resolve(kq);
            }
        });
    });
};

exports.getCN = () => {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM chi_nhanh", (err, kq) => {
            if (err) {
                reject(err);
            } else {
                resolve(kq);
            }
        });
    });
};

exports.getKH = (madm) => {
    return new Promise((resolve, reject) => {
        con.query(
            `SELECT MA_KH, TEN_KH, HINH_KH, TEN_DM FROM khoa_hoc inner join danh_muc_kh on danh_muc_kh.MA_DM = khoa_hoc.MA_DM WHERE khoa_hoc.MA_DM = "${madm}" AND khoa_hoc.XOA="0"`,
            (err, kq) => {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(kq);
                }
            }
        );
    });
};
exports.getAllBV = () => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM bai_viet`, (err, kq) => {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                resolve(kq);
            }
        });
    });
};

exports.search = (timkiem) => {
    return new Promise((resolve, reject) => {
        con.query(
            `SELECT MA_KH, TEN_KH, HINH_KH, TEN_DM FROM khoa_hoc inner join danh_muc_kh on danh_muc_kh.MA_DM = khoa_hoc.MA_DM WHERE (TEN_KH like "%${timkiem}%" OR MA_KH like "%${timkiem}%") AND khoa_hoc.XOA="0"`,
            (err, kq) => {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(kq);
                }
            }
        );
    });
};

exports.hocVien = () => {
    return new Promise((resolve, reject) => {
        con.query(
            `SELECT * FROM diem_so INNER JOIN hoc_vien ON hoc_vien.MA_HV = diem_so.MA_HV ORDER BY hoc_vien.HINH_DD DESC LIMIT 0,3`,
            (err, kq) => {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(kq);
                }
            }
        );
    });
};
