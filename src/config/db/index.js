const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "alf",
});

con.connect((err) => {
  if (err) {
    console.log(err);
    console.log("Thất bại");
  } else {
    console.log("Thành công");
  }
});
module.exports = con;
