const con = require("../../config/db");
class MoDangKy {
    xemTKB(maLop) {
        const tkb = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `SELECT thoi_khoa_bieu.MA_LOP as MA_LOP, thoi_khoa_bieu.MA_THU as MA_THU, thoi_khoa_bieu.MA_TG as MA_TG, thoi_khoa_bieu.MA_PHONG as MA_PHONG, TEN_LOP, thoi_gian.TG_BD, thoi_gian.TG_KT, TEN_THU, mo_dang_ky.MA_CHI_NHANH, TEN_PHONG FROM thoi_khoa_bieu INNER JOIN lop on thoi_khoa_bieu.MA_LOP = lop.MA_LOP 
                    INNER JOIN thoi_gian on thoi_khoa_bieu.MA_TG = thoi_gian.MA_TG 
                    INNER JOIN lich_hoc on thoi_khoa_bieu.MA_THU = lich_hoc.MA_THU
                    INNER JOIN mo_dang_ky on mo_dang_ky.MA_KHCC = lop.MA_KHCC
                    INNER JOIN phong_hoc on thoi_khoa_bieu.MA_PHONG = phong_hoc.MA_PHONG
                    WHERE thoi_khoa_bieu.MA_LOP = '${maLop}'`,
                    (err, kq) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(kq);
                        }
                    }
                );
            });
        };
        return tkb();
    }
    async xemDsLop(maKHCC) {
        const dslop = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `SELECT MA_LOP, khoa_hoc.MA_KH as MA_KH, TEN_KH, TEN_LOP, HO_TEN, mo_dang_ky.MA_CHI_NHANH, SO_LUONG, giao_vien.MA_GV, mo_dang_ky.MA_KHCC, (SELECT COUNT(*) FROM danh_sach_hoc_vien_lop WHERE danh_sach_hoc_vien_lop.MA_LOP = lop.MA_LOP) as SO_LUONG_HT FROM khoa_hoc INNER JOIN mo_dang_ky on khoa_hoc.MA_KH = mo_dang_ky.MA_KH INNER JOIN lop on lop.MA_KHCC = mo_dang_ky.MA_KHCC INNER JOIN giao_vien on lop.MA_GV = giao_vien.MA_GV WHERE mo_dang_ky.MA_KHCC = '${maKHCC}' and lop.XOA = "0"`,
                    (err, kq) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(kq);
                        }
                    }
                );
            });
        };
        const kq = await dslop();
        return kq;
    }
    listMoDangKy(offset, perPage, cn) {
        let chiNhanh;
        if (cn) {
            chiNhanh = `and MA_CHI_NHANH = '${cn}'`;
        } else {
            chiNhanh = ``;
        }
        const list = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `SELECT MA_KHCC ,khoa_hoc.MA_KH as MA_KH, TEN_KH, TG_BD, TG_KT, HOC_PHI, MA_CHI_NHANH FROM mo_dang_ky INNER JOIN khoa_hoc on mo_dang_ky.MA_KH = khoa_hoc.MA_KH WHERE (mo_dang_ky.TINH_TRANG = '1' AND mo_dang_ky.XOA = "0") ${chiNhanh} Limit ${offset}, ${perPage};`,
                    (err, kq) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(kq);
                        }
                    }
                );
            });
        };
        return list();
    }

    demMoDangKy(maKH = "", tenKH = "", cn) {
        let chiNhanh;
        if (cn) {
            chiNhanh = `and MA_CHI_NHANH = '${cn}'`;
        } else {
            chiNhanh = ``;
        }
        if (maKH || tenKH) {
            const count = () => {
                return new Promise((resolve, reject) => {
                    con.query(
                        `select count(*) as count FROM mo_dang_ky INNER JOIN khoa_hoc on mo_dang_ky.MA_KH = khoa_hoc.MA_KH where (mo_dang_ky.TINH_TRANG = '1' and TEN_KH like "%${tenKH}%" or mo_dang_ky.MA_KH = "${maKH}") ${chiNhanh} AND mo_dang_ky.XOA = "0"`,
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
                        `select count(*) as count FROM mo_dang_ky where (mo_dang_ky.TINH_TRANG = '1') ${chiNhanh} AND mo_dang_ky.XOA = "0"`,
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

    timkiemKH(offset, perPage, maKH, tenKH, cn) {
        let chiNhanh;
        if (cn) {
            chiNhanh = `and MA_CHI_NHANH = '${cn}'`;
        } else {
            chiNhanh = ``;
        }
        const timkiem = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `select MA_KHCC ,khoa_hoc.MA_KH as MA_KH, TEN_KH, TG_BD, TG_KT, HOC_PHI FROM mo_dang_ky INNER JOIN khoa_hoc on mo_dang_ky.MA_KH = khoa_hoc.MA_KH where (mo_dang_ky.TINH_TRANG = '1' and (TEN_KH like "%${tenKH}%" or mo_dang_ky.MA_KH = "${maKH}")) ${chiNhanh} AND mo_dang_ky.XOA = "0" Limit ${offset}, ${perPage}`,
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

    capnhat(maKHCC, maKH, tgBD, tgKT, hocphi, tt, cn) {
        const capnhat = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `UPDATE mo_dang_ky SET MA_KH ='${maKH}',TG_BD='${tgBD}',TG_KT='${tgKT}',HOC_PHI='${hocphi}',TINH_TRANG='${tt}', MA_CHI_NHANH='${cn}' WHERE MA_KHCC = '${maKHCC}'`,
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
        return capnhat();
    }

    xoaModangky(maKHCC) {
        const xoa = () => {
            return new Promise((resolve, reject) => {
                con.query(
                    `UPDATE mo_dang_ky SET XOA='1' WHERE MA_KHCC = '${maKHCC}'`,
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
        return xoa();
    }
}

module.exports = MoDangKy;
