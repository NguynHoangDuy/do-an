const con = require("../../config/db");

class HomePage {
  bannerImge() {
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
}

module.exports = HomePage;
