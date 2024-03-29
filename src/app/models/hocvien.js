const con = require("../../config/db");

class HocVien {
    dangnhap(username) {
        const login = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `SELECT * FROM hoc_vien WHERE MA_HV='${username}'`,
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
    demHv(hoten, sdt, cn) {
        const count = () => {
            let chiNhanh;
            if (cn) {
                chiNhanh = `and MA_CHI_NHANH = '${cn}'`;
            } else {
                chiNhanh = ``;
            }
            return new Promise((resolve, reject) => {
                con.query(
                    `select count(*) as count from hoc_vien where (HO_TEN like '%${hoten}%' or SDT='${sdt}') ${chiNhanh}`,
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
    timkiemHV(offset, perPage, hoten, sdt, cn) {
        const hv = () => {
            let chiNhanh;
            if (cn) {
                chiNhanh = `and MA_CHI_NHANH = '${cn}'`;
            } else {
                chiNhanh = ``;
            }
            return new Promise((resolve, reject) => {
                con.query(
                    `Select * from hoc_vien where (HO_TEN like '%${hoten}%' or SDT='${sdt}') ${chiNhanh} Limit ${offset}, ${perPage}`,
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
        return hv();
    }
    getAllHv(offset, perPage, cn) {
        const hv = () => {
            let chiNhanh;
            if (cn) {
                chiNhanh = `where MA_CHI_NHANH = '${cn}'`;
            } else {
                chiNhanh = ``;
            }
            return new Promise((resolve, reject) => {
                con.query(
                    `Select * from hoc_vien ${chiNhanh} Limit ${offset}, ${perPage}`,
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
        return hv();
    }
    async layMaHV() {
        return new Promise((resolve, reject) => {
            con.query("SELECT MAX(MA_HV) as MA_HV FROM hoc_vien", (err, id) => {
                if (err) {
                    reject(err);
                } else {
                    const countMaHV = parseInt(id[0].MA_HV.substr(5)) + 1;
                    const mahv = "ALFHV" + String(countMaHV).padStart(5, "0");
                    resolve(mahv);
                }
            });
        });
    }

    dangKyHV(mahv, hoten, email, mk, cn) {
        return new Promise((resolve, reject) => {
            con.query(
                `INSERT INTO hoc_vien(MA_HV, MA_QUYEN, HO_TEN, EMAIL, MAT_KHAU, TINH_TRANG, MA_CHI_NHANH) VALUES ('${mahv}','HV','${hoten}','${email}','${mk}','1','${cn}')`,
                (err, kq) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(1);
                    }
                }
            );
        });
    }

    themhocvien(
        ma_hv,
        ho_ten,
        gt,
        ngaysinh,
        sdt,
        diachi,
        email,
        matkhau,
        dt,
        lop,
        truong,
        phuhuynh,
        sdtph,
        nganh,
        truongdh,
        cv,
        chinhanh
    ) {
        let kqThem = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `INSERT INTO hoc_vien (MA_HV, MA_QUYEN, HO_TEN, GIOI_TINH, NGAY_SINH, SDT, DIA_CHI, EMAIL, MAT_KHAU, DOI_TUONG, TINH_TRANG, LOP, TRUONG, PHU_HUYNH, SDT_PH, NGANH, TRUONG_DH, CV, MA_CHI_NHANH, NGAY) VALUES ('${ma_hv}','HV','${ho_ten}','${gt}','${ngaysinh}','${sdt}','${diachi}', '${email}','${matkhau}','${dt}','1', '${lop}',  '${truong}', '${phuhuynh}', '${sdtph}', '${nganh}', '${truongdh}', '${cv}', '${chinhanh}', NOW())`,
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
        return kqThem();
    }

    xemthongtin(ma_hv) {
        let kq = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `SELECT * FROM hoc_vien where MA_HV = '${ma_hv}'`,
                    (err, dt) => {
                        if (err) {
                            resolve(0);
                        } else {
                            if (dt.length !== 0) {
                                resolve(dt);
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
    capnhathocvien(
        ma_hv,
        ho_ten,
        gt,
        ngaysinh,
        sdt,
        diachi,
        email,
        dt,
        lop,
        truong,
        phuhuynh,
        sdtph,
        nganh,
        truongdh,
        cv,
        tinh_trang,
        cn
    ) {
        let kq = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `UPDATE hoc_vien SET HO_TEN='${ho_ten}',GIOI_TINH='${gt}',NGAY_SINH='${ngaysinh}',SDT='${sdt}',DIA_CHI='${diachi}',EMAIL='${email}',DOI_TUONG='${dt}',TINH_TRANG='${tinh_trang}', LOP ='${lop}', TRUONG='${truong}', PHU_HUYNH='${phuhuynh}', SDT_PH='${sdtph}', NGANH='${nganh}', TRUONG_DH='${truongdh}', CV='${cv}', MA_CHI_NHANH='${cn}' WHERE MA_HV='${ma_hv}'`,
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

    capnhatthontin(
        ma_hv,
        ho_ten,
        gt,
        ngaysinh,
        sdt,
        diachi,
        email,
        dt,
        lop,
        truong,
        phuhuynh,
        sdtph,
        nganh,
        truongdh,
        cv,
        hinh_dd
    ) {
        return new Promise((resolve, reject) => {
            con.query(
                `UPDATE hoc_vien SET HO_TEN='${ho_ten}',GIOI_TINH='${gt}',NGAY_SINH='${ngaysinh}',SDT='${sdt}',DIA_CHI='${diachi}',EMAIL='${email}',DOI_TUONG='${dt}',LOP='${lop}',TRUONG='${truong}',PHU_HUYNH='${phuhuynh}',SDT_PH='${sdtph}',NGANH='${nganh}',TRUONG_DH='${truongdh}',CV='${cv}',HINH_DD='${hinh_dd}' WHERE MA_HV='${ma_hv}'`,
                (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(1);
                    }
                }
            );
        });
    }

    xoahocvien(mahv) {
        const kq = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `DELETE FROM hoc_vien WHERE MA_HV='${mahv}'`,
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

    resetMK(ma_hv, mk) {
        let kq = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `UPDATE hoc_vien SET MAT_KHAU='${mk}' WHERE MA_HV='${ma_hv}'`,
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

module.exports = HocVien;
