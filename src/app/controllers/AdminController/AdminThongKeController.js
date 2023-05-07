const { getSumHocPhi } = require("../../models/hocphi");
const {
    getThangHP,
    getNamHP,
    countListHP,
    getListHocPhi,
    getTongHP,
} = require("../../models/hocphi");
const { getSumLuongGVNAM } = require("../../models/luong");

class AdminThongKeController {
    async index(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;

        res.render("./admin/thongke");
    }

    async hocphi(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const admin = req.session.chinhanh;
        let THANG, NAM;
        const currentDate = new Date();
        const thang = await getThangHP();
        const nam = await getNamHP();
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
        let perPage = 20; // số lượng sản phẩm xuất hiện trên 1 page
        let page = parseInt(req.query.trang) || 1;
        const offset = (page - 1) * perPage;
        const totalCount = await countListHP(THANG, NAM, admin);
        const totalPages = Math.ceil(totalCount / perPage);

        const hocphi = await getListHocPhi(offset, perPage, THANG, NAM, admin);
        const tong = await getTongHP(THANG, NAM, admin);
        res.render("./admin/thongke/thongkehocphi", {
            thang,
            nam,
            THANG,
            NAM,
            hocphi,
            tong,
            current: page,
            pages: totalPages,
            perPage: perPage,
        });
    }

    async thuChi(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const admin = req.session.chinhanh;
        const currentDate = new Date();
        let NAM;
        if (req.query.nam) {
            NAM = req.query.nam;
        } else {
            NAM = currentDate.getFullYear();
        }
        const nam = await getNamHP();
        const hocphi = JSON.stringify(await getSumHocPhi(NAM, admin));
        const luong = JSON.stringify(await getSumLuongGVNAM(NAM, admin));
        res.render("./admin/thongke/thongkethuchi", { nam, hocphi, luong });
    }
}

module.exports = new AdminThongKeController();
