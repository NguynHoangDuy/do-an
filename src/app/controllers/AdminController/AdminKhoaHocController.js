const KhoaHoc = require("../../models/khoahoc");
const ChiNhanh = require("../../models/chinhanh");
const { getAll } = require("../../models/dm_kh");
class AdminKhoaHocController {
    async index(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        let perPage = 10;
        let page = parseInt(req.query.trang) || 1;
        const offset = (page - 1) * perPage;
        const makh = req.query.maKH;
        const tenkh = req.query.tenKH;
        const khoaHoc = new KhoaHoc();
        const listDM = await getAll();

        const chiNhanh = new ChiNhanh();
        const admin = req.session.chinhanh;
        const dsMaCN = await chiNhanh.xemChiNhanh();
        if (!makh && !tenkh) {
            const totalCount = await khoaHoc.demKH();
            const totalPages = Math.ceil(totalCount / perPage);
            const listKH = await khoaHoc.dsKhoaHoc(offset, perPage);
            res.render("./admin/khoahoc", {
                listKH,
                current: page,
                pages: totalPages,
                perPage: perPage,
                tk: false,
                admin,
                dsMaCN,
                listDM,
            });
        } else {
            const totalCount = await khoaHoc.demKH(makh, tenkh);
            const totalPages = Math.ceil(totalCount / perPage);
            const listKH = await khoaHoc.timkiemKH(
                offset,
                perPage,
                makh,
                tenkh
            );

            res.render("./admin/khoahoc", {
                listKH,
                current: page,
                pages: totalPages,
                perPage: perPage,
                tk: true,
                makh,
                tenkh,
                admin,
                dsMaCN,
                listDM,
            });
        }
    }
    async themKhoaHoc(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const { maKH, tenKH, dmkh } = req.body;

        const khoahoc = new KhoaHoc();
        const kq = await khoahoc.themkhoahoc(maKH, tenKH, dmkh);
        if (kq === 1) {
            req.flash("success", "Thêm khóa học thành công.");
            res.redirect(`/admin/khoahoc`);
        } else {
            req.flash("fail", "Thêm khóa học không thành công.");
            res.redirect(`/admin/khoahoc`);
        }
    }
    async capNhatKhoaHoc(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const old = req.query.makh;

        const { maKH, tenKH, dmkh } = req.body;

        const khoahoc = new KhoaHoc();
        const kq = await khoahoc.capnhatkhoahoc(maKH, tenKH, dmkh, old);
        if (kq === 1) {
            req.flash("success", "Cập nhật khóa học thành công.");
            res.redirect(`/admin/khoahoc`);
        } else {
            req.flash("fail", "Cập nhật khóa học không thành công.");
            res.redirect(`/admin/khoahoc`);
        }
    }
    async xoaKhoaHoc(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const old = req.query.makh;
        const khoahoc = new KhoaHoc();
        const kq = await khoahoc.xoakhoahoc(old);
        if (kq === 1) {
            req.flash("success", "Xóa khóa học thành công.");
            res.redirect(`/admin/khoahoc`);
        } else {
            req.flash("fail", "Xóa khóa học không thành công.");
            res.redirect(`/admin/khoahoc`);
        }
    }
    async moDangKy(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        let tt = 1;
        const { makh, ngaybd, ngaykt, hocphi } = req.body;
        let cn;
        if (req.session.chinhanh) {
            cn = req.session.chinhanh;
        } else {
            cn = req.body.chinhanh;
        }
        const khoahoc = new KhoaHoc();
        const kq = await khoahoc.moDangKy(makh, ngaybd, ngaykt, hocphi, tt, cn);
        if (kq === 1) {
            req.flash("success", "Mở đăng ký thành công.");
            res.redirect(`/admin/khoahoc`);
        } else {
            req.flash("fail", "Mở đăng ký không thành công.");
            res.redirect(`/admin/khoahoc`);
        }
    }
}

module.exports = new AdminKhoaHocController();
