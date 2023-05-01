const MoDangKy = require("../../models/modangky");
const Lop = require("../../models/lop");
class HocVienDangKyController {
    async index(req, res) {
        res.locals.quyen = "Học viên";
        res.locals.ten = req.session.ten;
        const mahv = req.session.username;
        const macn = req.session.chinhanh;
        const modangky = new MoDangKy();

        function formatDate(date) {
            if (date !== "0000-00-00") {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                return `${year}-${month}-${day}`;
            } else {
                return "0000-00-00";
            }
        }

        const listMDK = await modangky.getMoDangKyHv(mahv, macn);
        const listDK = await modangky.getHvDangKy(mahv);
        res.render("./hocvien/dskh", { listDK, listMDK, formatDate });
    }
    async dangKy(req, res) {
        res.locals.quyen = "Học viên";
        res.locals.ten = req.session.ten;
        const mahv = req.session.username;
        const makhcc = req.params.makhcc;
        const modangky = new MoDangKy();
        const kq = await modangky.dangKy(mahv, makhcc);
        if (kq === 1) {
            req.flash("success", "Đăng ký thành công.");
            res.redirect(`/hocvien/dangkykhoahoc`);
        } else {
            req.flash("fail", "Đăng ký không thành công");
            res.redirect(`/hocvien/dangkykhoahoc`);
        }
    }
    async huyDangKy(req, res) {
        res.locals.quyen = "Học viên";
        res.locals.ten = req.session.ten;
        const mahv = req.session.username;
        const makhcc = req.params.makhcc;
        const modangky = new MoDangKy();
        const kq = await modangky.huyDangKy(mahv, makhcc);
        if (kq === 1) {
            req.flash("success", "Hủy đăng ký thành công.");
            res.redirect(`/hocvien/dangkykhoahoc`);
        } else {
            req.flash("fail", "Hủy đăng ký không thành công");
            res.redirect(`/hocvien/dangkykhoahoc`);
        }
    }

    async dangKyLop(req, res) {
        res.locals.quyen = "Học viên";
        res.locals.ten = req.session.ten;
        const mahv = req.session.username;
        const modangky = new MoDangKy();
        const listDK = await modangky.getHvDangKy(mahv);
        res.render("./hocvien/dangkylop", { listDK, mahv });
    }

    async hvDangKy(req, res) {
        res.locals.quyen = "Học viên";
        res.locals.ten = req.session.ten;
        const mahv = req.session.username;
        const malop = req.params.malop;
        const lop = new Lop();
        const xoa = await lop.xoaLop(malop, mahv);
        console.log(malop, mahv);
        if (xoa === 1) {
            const kq = await lop.themHocVien(malop, mahv);
            if (kq === 1) {
                req.flash("success", "Đăng ký thành công.");
                res.redirect(`/hocvien/dangkylop`);
            } else {
                req.flash("fail", "Đăng ký không thành công");
                res.redirect(`/hocvien/dangkylop`);
            }
        } else {
            req.flash("fail", "Đăng ký không thành công");
            res.redirect(`/hocvien/dangkylop`);
        }
    }
    async hvHuyDangKy(req, res) {
        res.locals.quyen = "Học viên";
        res.locals.ten = req.session.ten;
        const mahv = req.session.username;
        const malop = req.params.malop;
        const lop = new Lop();
        console.log(malop, mahv);

        const kq = await lop.xoaHocVienLop(malop, mahv);
        if (kq === 1) {
            req.flash("success", "Hủy đăng ký thành công.");
            res.redirect(`/hocvien/dangkylop`);
        } else {
            req.flash("fail", "Hủy đăng ký không thành công");
            res.redirect(`/hocvien/dangkylop`);
        }
    }

    async danhSachLop(req, res) {
        const { makhcc, mahv } = req.query;
        const moDangKy = new MoDangKy();
        const dslop = await moDangKy.dsLopHV(makhcc, mahv);
        if (dslop) {
            res.json(dslop);
        }
    }
}

module.exports = new HocVienDangKyController();
