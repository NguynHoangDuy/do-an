const db = require("../../config/db");
class BaiViet {
  constructor(id, tieu_de, noi_dung, hinh_anh, ngay_tao, trang_thai, ma_qtv) {
    this.id = id;
    this.tieu_de = tieu_de;
    this.noi_dung = noi_dung;
    this.hinh_anh = hinh_anh;
    this.ngay_tao = ngay_tao;
    this.trang_thai = trang_thai;
    this.ma_qtv = ma_qtv;
  }

  create(baiviet) {
    const query = "INSERT INTO bai_viet SET ?";
    return new Promise((resolve, reject) => {
      db.query(query, baiviet, (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(1);
        }
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM bai_viet WHERE id = ${id}`;
      db.query(query, (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM bai_viet";
      db.query(query, (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  updateById(id, baiviet) {
    const query = "UPDATE bai_viet SET ? WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.query(query, [baiviet, id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(1);
        }
      });
    });
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM bai_viet WHERE id = ?";
      db.query(query, id, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(1);
        }
      });
    });
  }
}

module.exports = BaiViet;
