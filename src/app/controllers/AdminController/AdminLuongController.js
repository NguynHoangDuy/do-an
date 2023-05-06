const {
    getListHour,
    getHeSoLuong,
    getListLuong,
    getThang,
    getNam,
    themLuong,
} = require("../../models/luong");

class AdminLuongController {
    async index(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const admin = req.session.chinhanh;
        let THANG, NAM;
        const currentDate = new Date();
        const thang = await getThang();
        const nam = await getNam();
        if (req.query.thang) {
            THANG = req.query.thang;
        } else {
            THANG = currentDate.getMonth() + 1;
        }
        if (req.query.nam) {
            NAM = req.query.nam;
        } else {
            NAM = currentDate.getFullYear();
        }
        const luong = await getListLuong(THANG, NAM, admin);
        res.render("./admin/luong/luong-gv", { luong, thang, nam, THANG, NAM });
    }

    async themLuongGV(req, res) {
        const list = await getListHour();
        const currentDate = new Date();
        const THANG = currentDate.getMonth() + 1;
        const NAM = currentDate.getFullYear();
        let kq = 0;
        list.forEach(async (item) => {
            let MA_GV = item.MA_GV;
            const heso = await getHeSoLuong(MA_GV);
            const GIO = item.GIO_LAM_VIEC;
            const TIEN_LUONG = Number(GIO * heso);
            const BHYT = Number(TIEN_LUONG * (1.5 / 100));
            const BHXH = Number(TIEN_LUONG * (8 / 100));
            const THUC_NHAN = Number(TIEN_LUONG - BHYT - BHXH);
            let luong = {
                THANG,
                NAM,
                MA_GV,
                GIO,
                TIEN_LUONG,
                BHXH,
                BHYT,
                THUC_NHAN,
            };

            kq = await themLuong(luong);
        });

        if (kq === 1) {
            req.flash("success", `Tính lương tháng ${THANG} thành công`);
            res.redirect(`/admin/luong/giaovien`);
        } else {
            req.flash("fail", `Tính lương không tháng ${THANG} thành công`);
            res.redirect(`/admin/luong/giaovien`);
        }
    }
}

module.exports = new AdminLuongController();
