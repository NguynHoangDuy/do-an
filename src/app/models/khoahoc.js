const con = require("../../config/db");
class KhoaHoc {
    getKHById(maKH){
        return new Promise((resolve, reject) => {
            con.query(`SELECT * from khoa_hoc WHERE MA_KH='${maKH}'`, (err, kq) => {
                if (err) {
                    resolve([]);
                } else {
                    resolve(kq);
                }
            });
        })
    }
    dsKhoaHocAll() {
        const dsKH = () => {
            return new Promise((resolve, reject) => {
                con.query(`SELECT * from khoa_hoc WHERE XOA="0"`, (err, kq) => {
                    if (err) {
                        resolve([]);
                    } else {
                        resolve(kq);
                    }
                });
            });
        };
        return dsKH();
    }
    dsKhoaHoc(offset, perPage) {
        const dsKH = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `SELECT * from khoa_hoc WHERE XOA="0" Limit ${offset}, ${perPage}`,
                    (err, kq) => {
                        if (err) {
                            resolve([]);
                        } else {
                            resolve(kq);
                        }
                    }
                );
            });
        };
        return dsKH();
    }
    demKH(maKH = "", tenKH = "") {
        if (maKH || tenKH) {
            const count = () => {
                return new Promise((resolve, reject) => {
                    con.query(
                        `select count(*) as count from khoa_hoc where (TEN_KH like "%${tenKH}%" or MA_KH = "${maKH}") and XOA="0" `,
                        (err, kq) => {
                            if (err) {
                                reject(0);
                            } else {
                                resolve(kq[0].count);
                            }
                        }
                    );
                });
            };
            return count();
        } else {
            const count = () => {
                return new Promise((resolve, reject) => {
                    con.query(
                        `select count(*) as count from khoa_hoc WHERE XOA="0"`,
                        (err, kq) => {
                            if (err) {
                                reject(0);
                            } else {
                                resolve(kq[0].count);
                            }
                        }
                    );
                });
            };
            return count();
        }
    }
    timkiemKH(offset, perPage, maKH, tenKH) {
        const timkiem = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `SELECT * from khoa_hoc where (TEN_KH like "%${tenKH}%" or MA_KH = "${maKH}") AND XOA="0" Limit ${offset}, ${perPage}`,
                    (err, kq) => {
                        if (err) {
                            resolve([]);
                        } else {
                            resolve(kq);
                        }
                    }
                );
            });
        };
        return timkiem();
    }

    themkhoahoc(maKH, tenKH, ma_dm, anh_dd) {
        const khoahoc = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `INSERT INTO khoa_hoc (MA_KH, TEN_KH, MA_DM, HINH_KH, XOA) VALUES ('${maKH}','${tenKH}', '${ma_dm}', '${anh_dd}','0')`,
                    (err, kq) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(1);
                        }
                    }
                );
            });
        };
        return khoahoc();
    }
    capnhatkhoahoc(maKH, tenKH, maDM, anh_dd, old) {
        const khoahoc = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `UPDATE khoa_hoc SET MA_KH='${maKH}',TEN_KH='${tenKH}', MA_DM='${maDM}', HINH_KH = '${anh_dd}' WHERE MA_KH = '${old}'`,
                    (err, kq) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(1);
                        }
                    }
                );
            });
        };
        return khoahoc();
    }
    xoakhoahoc(maKH) {
        const kq = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `UPDATE khoa_hoc SET XOA="1" WHERE MA_KH='${maKH}'`,
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(1);
                        }
                    }
                );
            });
        };
        return kq();
    }

    moDangKy(maKH, tgBD, tgKT, hocphi, cn) {
        const moDK = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `INSERT INTO mo_dang_ky (MA_KH, TG_BD, TG_KT, HOC_PHI, TINH_TRANG, MA_CHI_NHANH, XOA) VALUES ('${maKH}','${tgBD}','${tgKT}','${hocphi}','1', '${cn}', '0')`,
                    (err, kq) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            resolve(1);
                        }
                    }
                );
            });
        };
        return moDK();
    }
}

module.exports = KhoaHoc;
