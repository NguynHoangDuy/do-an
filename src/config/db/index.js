const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "alf",
});

con.connect(() => console.log("Connect suscesion"));
module.exports = con;
