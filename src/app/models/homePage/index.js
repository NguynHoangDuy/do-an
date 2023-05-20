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
}

exports.getKH = () => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT MA_KH, TEN_KH, HINH_KH, MA_DM FROM khoa_hoc ORDER BY MA_DM`, (err, kq) => {
            if (err) {
                reject(err);
                console.log(err)
            } else {
                resolve(kq);
            }
        });
    });
}
exports.getAllBV = () => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM bai_viet`, (err, kq) => {
            if (err) {
                reject(err);
                console.log(err)
            } else {
                resolve(kq);
            }
        });
    });
}

