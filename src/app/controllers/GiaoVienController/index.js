const ThoiKhoaBieu = require("../../models/thoikhoabieu");

class GiaoVienController {
    index(req, res) {
        res.locals.quyen = "Giáo viên";
        res.locals.ten = req.session.ten;
        res.render("./giaovien");
    }
    async thoikhoabieu(req, res) {
        res.locals.quyen = "Giáo viên";
        res.locals.ten = req.session.ten;
        const magv = req.session.username;
        const tkb = new ThoiKhoaBieu();
        const kq = await tkb.getTKbGV(magv);
        const listTKB = JSON.stringify(kq);
        res.render("./giaovien/thoikhoabieu", { magv, listTKB });
    }
}

module.exports = new GiaoVienController();
