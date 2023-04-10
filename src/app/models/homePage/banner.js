const con = require("../../../config/db");

class Banner {
  bannerImage() {
    return new Promise((resolve, reject) => {
      con.query("SELECT * FROM `banner_home`", (err, kq) => {
        if (err) {
          reject(err);
        } else {
          resolve(kq);
        }
      });
    });
  }
  them(url) {
    return new Promise((resolve, reject) => {
      con.query(`INSERT INTO banner_home (url) VALUES ('${url}')`, (err, kq) => {
        if (err) {
          console.log(err)
          reject(err);
        } else {
          resolve(1);
        }
      });
    });
  }
  xoa(id) {
    return new Promise((resolve, reject) => {
      con.query(`DELETE FROM banner_home WHERE id='${id}'`, (err, kq) => {
        if (err) {
          reject(err);
        } else {
          resolve(1);
        }
      });
    });
  }
}

module.exports = Banner;
