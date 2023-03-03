const con = require("../../config/db");
const bcrypt = require('bcrypt');
class GuestController {
  index(req, res) {
    res.render('index', {title: "Hey "});
  }
  loginForm(req, res){
    res.render("login")
  }
  
  dangnhap(req,res){
    const {username, password}  = req.body;
    if(username && password)
    {
      con.query(`SELECT * FROM quan_tri_vien WHERE MA_QTV='${username}'`, (err, result)=>{
        if(err)
        {
          res.redirect('/');
        }
        else 
        {
          if (result.length === 0) {
            console.log('Invalid username');
            res.redirect('/');
          }
          else {
            bcrypt.compare(password, result[0].MAT_KHAU, (err, kq) => {
              if (kq) {
                req.session.loggedin = true;
                req.session.username = result[0].MA_QTV;
                res.redirect('./admin/admin');
              } else {
                console.log(result[0].MAT_KHAU)
                console.log("sai")
              }
            });
          }
        }
      })
    }
  }
}

module.exports = new GuestController();
