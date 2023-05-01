const TKB = require("../../models/thoikhoabieu");
class HocVienController {
    index(req, res) {
        res.locals.quyen = "Học viên";
        res.locals.ten = req.session.ten;
        res.render("./hocvien");
    }

    async thoikhoabieu(req, res) {
        res.locals.quyen = "Học viên";
        res.locals.ten = req.session.ten;
        const mahv = req.session.username;
        const tkb = new TKB();
        const kq = await tkb.getTKbHV(mahv);
        const listTKB = JSON.stringify(kq);
        res.render("./hocvien/thoikhoabieu", { mahv, listTKB });
    }
}

module.exports = new HocVienController();
