class HocVienController {
    index(req, res) {
        res.locals.quyen = "Học viên";
        res.locals.ten = req.session.ten;
        res.render("./hocvien");
    }
}

module.exports = new HocVienController();
