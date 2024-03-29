const db = require("../../config/db");

function add(TEN_DM, ANH_DD) {
    const sql = `INSERT INTO danh_muc_kh (TEN_DM, ANH_DD, XOA) VALUES (?, ?, 0)`;
    return new Promise((resolve, reject) => {
        db.query(sql, [TEN_DM, ANH_DD], (err, res) => {
            if (err) reject(err);
            else resolve(1);
        });
    });
}

function getDM(madm) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM danh_muc_kh WHERE MA_DM = '${madm}'`, (err, res) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(res[0])
            }
        })
    })
}
// Modal function for updating data in danh_muc_kh table
function update(madm, tendm, anhdd) {
    const sql = `UPDATE danh_muc_kh SET TEN_DM = ?, ANH_DD = ? WHERE MA_DM = ?`;
    return new Promise((resolve, reject) => {
        db.query(sql, [tendm, anhdd, madm], (err, res) => {
            if (err) {
                reject(err);
                console.log(err);
            } else resolve(1);
        });
    });
}

// Modal function for removing data from danh_muc_kh table
function remove(ma_dm) {
    const sql = `UPDATE danh_muc_kh SET XOA = 1 WHERE MA_DM = ?`;
    return new Promise((resolve, reject) => {
        db.query(sql, [ma_dm], (err, res) => {
            if (err) reject(err);
            else resolve(1);
        });
    });
}

function getAll() {
    const sql = `SELECT MA_DM, TEN_DM FROM danh_muc_kh WHERE XOA = '0'`;

    return new Promise((resolve, reject) => {
        db.query(sql, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
}

function getKHinDM(madm, cn) {
    let chiNhanh;
    if (cn) {
        chiNhanh = `and MA_CHI_NHANH = '${cn}'`;
    } else {
        chiNhanh = ``;
    }
    const sql = `SELECT khoa_hoc.MA_DM, MA_KH, TEN_KH, TEN_DM, (SELECT COUNT(*) FROM mo_dang_ky WHERE mo_dang_ky.MA_KH = khoa_hoc.MA_KH  AND mo_dang_ky.XOA = 0 ${chiNhanh}) as SO_LUONG FROM khoa_hoc INNER JOIN danh_muc_kh on khoa_hoc.MA_DM = danh_muc_kh.MA_DM WHERE khoa_hoc.MA_DM = "${madm}" and khoa_hoc.XOA = 0`;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
}
function getListMDK(offset, perPage, cn, makh) {
    let chiNhanh;
    if (cn) {
        chiNhanh = `and MA_CHI_NHANH = '${cn}'`;
    } else {
        chiNhanh = ``;
    }
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT MA_KHCC ,khoa_hoc.MA_KH as MA_KH, TEN_KH, TG_BD, TG_KT, TINH_TRANG,HOC_PHI, MA_CHI_NHANH FROM mo_dang_ky INNER JOIN khoa_hoc on mo_dang_ky.MA_KH = khoa_hoc.MA_KH WHERE ( mo_dang_ky.XOA = "0") AND mo_dang_ky.MA_KH = "${makh}" ${chiNhanh}  Limit ${offset}, ${perPage};`,
            (err, kq) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(kq);
                }
            }
        );
    });
}
function demMoDangKy(cn, makh) {
    let chiNhanh;
    if (cn) {
        chiNhanh = `and MA_CHI_NHANH = '${cn}'`;
    } else {
        chiNhanh = ``;
    }
    return new Promise((resolve, reject) => {
        db.query(
            `select count(*) as count FROM mo_dang_ky INNER JOIN khoa_hoc on mo_dang_ky.MA_KH = khoa_hoc.MA_KH WHERE ( mo_dang_ky.XOA = "0") ${chiNhanh} AND mo_dang_ky.MA_KH = "${makh}"`,
            (err, kq) => {
                if (err) {
                    reject(0);
                } else {
                    resolve(kq[0].count);
                }
            }
        );
    });
}



module.exports = {
    add,
    update,
    remove,
    getAll,
    getKHinDM,
    getListMDK,
    demMoDangKy,
    getDM
};
