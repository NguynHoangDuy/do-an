const con = require("../../../config/db");

class Banner {
  them(url) {
    return new Promise((resolve, reject) => {
      con.query(`INSERT INTO banner_home(url) VALUES ('${url}')`, (err, kq) => {
        if (err) {
          reject(err);
        } else {
          resolve(kq);
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
          resolve(kq);
        }
      });
    });
  }
}

module.exports = Banner;
