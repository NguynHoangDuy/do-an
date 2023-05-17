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