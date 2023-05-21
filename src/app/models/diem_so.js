const con = require("../../config/db");

exports.demHv = (cn) => {
    const count = () => {
        let chiNhanh;
        if (cn) {
            chiNhanh = `WHERE MA_CHI_NHANH = '${cn}'`;
        } else {
            chiNhanh = ``;
        }
        return new Promise((resolve, reject) => {
            con.query(
                `select count(*) as count from hoc_vien INNER JOIN diem_so ON hoc_vien.MA_HV = diem_so.MA_HV ${chiNhanh}`,
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
};

exports.getAllHv = (offset, perPage, cn) => {
    const hv = () => {
        let chiNhanh;
        if (cn) {
            chiNhanh = `where MA_CHI_NHANH = '${cn}'`;
        } else {
            chiNhanh = ``;
        }
        return new Promise((resolve, reject) => {
            con.query(
                `Select * from hoc_vien INNER JOIN diem_so ON hoc_vien.MA_HV = diem_so.MA_HV ${chiNhanh} Limit ${offset}, ${perPage}`,
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
};

exports.themDiemSo = (mahv, kyThy, diem) => {
    return new Promise((resolve, reject) => {
        con.query(
            `INSERT INTO diem_so(MA_HV, MON, DIEM) VALUES ('${mahv}','${kyThy}','${diem}')`,
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(1);
                }
            }
        );
    });
};

exports.xoa = (id) => {
    return new Promise((resolve, reject) => {
        con.query(`DELETE FROM diem_so WHERE id = '${id}'`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(1);
            }
        });
    });
};
