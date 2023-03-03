
class AdminController{
    index(req, res) {
        res.render('./admin/admin');
      }

      dangxuat(req,res){
        req.session.destroy(function(err) {
          if (err) {
            console.log(err);
          }
          res.redirect('/');
        });
      }
}

module.exports = new AdminController()