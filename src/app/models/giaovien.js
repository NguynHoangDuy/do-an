const con = require("../../config/db");

class GiaoVien {
    dangnhap(username) {
        const login = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `SELECT * FROM giao_vien WHERE MA_GV='${username}'`,
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    }
                );
            });
        };
        return login();
    }
    getGvByCN(cn) {
        return new Promise((resolve, reject) => {
            const query = `SELECT MA_GV, HO_TEN FROM giao_vien where MA_CHI_NHANH = '${cn}'`;
            con.query(query, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }
    dsGv() {
        const ds = () => {
            return new Promise((resolve, reject) => {
                con.query("SELECT * from giao_vien", (err, kq) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(1);
                    }
                });
            });
        };
        return ds();
    }
    demGv(ho_ten, cn) {
        let chiNhanh;
        if (cn) {
            chiNhanh = `and MA_CHI_NHANH = '${cn}'`;
        } else {
            chiNhanh = ``;
        }
        const count = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `select count(*) as count from giao_vien where (HO_TEN like "%${ho_ten}%") ${chiNhanh}`,
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
    getAllGv(offset, perPage, cn) {
        let chiNhanh;
        if (cn) {
            chiNhanh = `where MA_CHI_NHANH = '${cn}'`;
        } else {
            chiNhanh = ``;
        }
        const gv = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `Select * from giao_vien ${chiNhanh} Limit ${offset}, ${perPage}`,
                    (err, kq) => {
                        if (err) {
                            reject([]);
                        } else {
                            if (kq.length !== 0) resolve(kq);
                            else resolve([]);
                        }
                    }
                );
            });
        };
        return gv();
    }
    timkiemGiaoVien(offset, perPage, hoten, cn) {
        let chiNhanh;
        if (cn) {
            chiNhanh = `and MA_CHI_NHANH = '${cn}'`;
        } else {
            chiNhanh = ``;
        }
        const gv = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `Select * from giao_vien where (HO_TEN like "%${hoten}%") ${chiNhanh} Limit ${offset}, ${perPage}`,
                    (err, kq) => {
                        if (err) {
                            con;
                            resolve([]);
                        } else {
                            if (kq.length !== 0) resolve(kq);
                            else resolve([]);
                        }
                    }
                );
            });
        };
        return gv();
    }
    layMaGV() {
        const magv = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    "SELECT MAX(MA_GV) as MA_GV FROM giao_vien",
                    (err, id) => {
                        if (err) {
                            reject(0);
                        } else {
                            const countMaGV =
                                parseInt(id[0].MA_GV.substr(5)) + 1;
                            const mahv =
                                "ALFGV" + String(countMaGV).padStart(3, "0");
                            resolve(mahv);
                        }
                    }
                );
            });
        };
        return magv();
    }
    themgiaovien(
        ma_gv,
        ho_ten,
        gt,
        ngaysinh,
        sdt,
        diachi,
        email,
        matkhau,
        trinhdo,
        anh_dd,
        cn
    ) {
        let kqThem = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `INSERT INTO giao_vien (MA_GV, MA_QUYEN, HO_TEN, GIOI_TINH, NGAY_SINH, SDT, DIA_CHI, EMAIL, MAT_KHAU, TRINH_DO, ANH_DD, MA_CHI_NHANH) VALUES ('${ma_gv}','GV','${ho_ten}','${gt}','${ngaysinh}','${sdt}','${diachi}','${email}','${matkhau}','${trinhdo}','${anh_dd}', '${cn}')`,
                    (err, result) => {
                        if (err) {
                            resolve(0);
                        } else {
                            resolve(1);
                        }
                    }
                );
            });
        };
        return kqThem();
    }

    xemthongtin(ma_gv) {
        let kq = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `SELECT * FROM giao_vien where MA_GV = '${ma_gv}'`,
                    (err, dt) => {
                        if (err) {
                            resolve(0);
                        } else {
                            if (dt.length !== 0) {
                                resolve(dt[0]);
                            } else {
                                resolve(0);
                            }
                        }
                    }
                );
            });
        };
        return kq();
    }
    capnhatgiaovien(
        ma_gv,
        ho_ten,
        gt,
        ngaysinh,
        sdt,
        diachi,
        email,
        trinhdo,
        anh_dd,
        cn
    ) {
        let kq = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `UPDATE giao_vien SET HO_TEN='${ho_ten}',GIOI_TINH='${gt}',NGAY_SINH='${ngaysinh}',SDT='${sdt}',DIA_CHI='${diachi}',EMAIL='${email}', ANH_DD='${anh_dd}', TRINH_DO='${trinhdo}', MA_CHI_NHANH='${cn}' WHERE MA_GV='${ma_gv}'`,
                    (err, dt) => {
                        if (err) {
                            console.log(err);
                            resolve(0);
                        } else {
                            resolve(1);
                        }
                    }
                );
            });
        };
        return kq();
    }

    xoagiaovien(magv) {
        const kq = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `DELETE FROM giao_vien WHERE MA_GV='${magv}'`,
                    (err, result) => {
                        if (err) {
                            resolve(0);
                        } else {
                            resolve(1);
                        }
                    }
                );
            });
        };
        return kq();
    }

    resetMK(ma_gv, mk) {
        let kq = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `UPDATE giao_vien SET MAT_KHAU='${mk}' WHERE MA_GV='${ma_gv}'`,
                    (err, dt) => {
                        if (err) {
                            resolve(0);
                        } else {
                            resolve(1);
                        }
                    }
                );
            });
        };
        return kq();
    }
}

module.exports = GiaoVien;
