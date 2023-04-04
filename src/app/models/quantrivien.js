const con = require("../../config/db");
class QuanTriVien {
  constructor(maQtv) {
    this.maQtv = maQtv;
  }

  dangnhap(username){
    const login = ()=>{
      return new Promise((resolve, reject) => {
        con.query(
          `SELECT * FROM quan_tri_vien WHERE MA_QTV='${username}'`,
          (err, result) => {
            if(err){
              reject(err)
            }
            else {
              resolve(result)
            }
          })
      })
    }
    return login()
  }
  async getTK() {
    const gv = () => {
      return new Promise((resolve, reject) => {
        con.query(`Select * from quan_tri_vien`, (err, kq) => {
          if (err) {
            console.log(err);
            resolve([]);
          } else {
            if (kq.length !== 0) resolve(kq);
            else resolve([]);
          }
        });
      });
    };
    return await gv();
  }
  async layMaQTV() {
    const magv = () => {
      return new Promise((resolve, reject) => {
        con.query(
          "SELECT MAX(MA_QTV) as MA_QTV FROM quan_tri_vien",
          (err, id) => {
            if (err) {
              reject(0);
            } else {
              const countMaQTV = parseInt(id[0].MA_QTV.substr(3)) + 1;
              const mahv = "ALF" + String(countMaQTV).padStart(3, "0");
              resolve(mahv);
            }
          }
        );
      });
    };
    return await magv();
  }
  async themQtv(maQtv, mk) {
    let kqThem = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `INSERT INTO quan_tri_vien (MA_QTV, MA_QUYEN, MAT_KHAU) VALUES ('${maQtv}','QTV','${mk}')`,
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
    return await kqThem();
  }

  async xoaQtv(maQtv) {
    const kq = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `DELETE FROM quan_tri_vien WHERE MA_QTV='${maQtv}'`,
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
    return await kq();
  }

  async doiMK(ma_qtv, mk) {
    let kq = () => {
      return new Promise((resolve, reject) => {
        con.query(
          `UPDATE quan_tri_vien SET MAT_KHAU='${mk}' WHERE MA_QTV='${ma_qtv}'`,
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
    return await kq();
  }
}

module.exports = QuanTriVien;
