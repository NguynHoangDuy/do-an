const bcrypt = require("bcrypt");
const ChiNhanh = require("../../models/chinhanh");
const HocVien = require("../../models/hocvien");
class AdminHocVienController {
    async index(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        let perPage = 20; // số lượng sản phẩm xuất hiện trên 1 page
        let page = parseInt(req.query.trang) || 1;
        const offset = (page - 1) * perPage;
        const hv = new HocVien();
        const totalCount = await hv.demHv("", "", req.session.chinhanh);
        const totalPages = Math.ceil(totalCount / perPage);
        const listHv = await hv.getAllHv(offset, perPage, req.session.chinhanh);
        res.render("./admin/hocvien", {
            listHv: listHv,
            current: page,
            pages: totalPages,
            perPage: perPage,
        });
    }

    async timkiem(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        let perPage = 2; // số lượng sản phẩm xuất hiện trên 1 page
        let page = parseInt(req.query.trang) || 1;
        const offset = (page - 1) * perPage;
        const hoten = req.query.hoten;
        const sdt = req.query.sdt;
        if (!hoten && !sdt) {
            const hv = new HocVien();
            const totalCount = await hv.demHv("", "", req.session.chinhanh);
            const totalPages = Math.ceil(totalCount / perPage);
            const listHv = await hv.getAllHv(
                offset,
                perPage,
                req.session.chinhanh
            );
            res.render("./admin/hocvien/timkiem", {
                listHv: listHv,
                current: page,
                pages: totalPages,
                perPage: perPage,
            });
        } else {
            const hv = new HocVien();
            const totalCount = await hv.demHv(hoten, sdt, req.session.chinhanh);
            const totalPages = Math.ceil(totalCount / perPage);
            const listHv = await hv.timkiemHV(
                offset,
                perPage,
                hoten,
                sdt,
                req.session.chinhanh
            );
            res.render("./admin/hocvien/timkiem", {
                listHv: listHv,
                current: page,
                pages: totalPages,
                kq: totalCount,
                hoten: hoten,
                sdt: sdt,
                perPage: perPage,
            });
        }
    }

    async themhocvien(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const chiNhanh = new ChiNhanh();
        const admin = req.session.chinhanh;
        const dsMaCN = await chiNhanh.xemChiNhanh();
        res.render("./admin/hocvien/them", { dsMaCN, admin });
    }
    async themhocvien_action(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const {
            hoten,
            gt,
            ngaysinh,
            sdt,
            diachi,
            email,
            dt,
            lop,
            truong,
            phuhuynh,
            sdtph,
            nganh,
            truongdh,
            cv,
        } = req.body;
        let cn;
        if (req.session.chinhanh) {
            cn = req.session.chinhanh;
        } else {
            cn = req.body.chinhanh;
        }
        const hv = new HocVien();
        const mahv = await hv.layMaHV();

        const mkArr = ngaysinh.split("-");
        const mk = mkArr.reverse().join("");
        const salt = bcrypt.genSaltSync(10);
        const mkHash = bcrypt.hashSync(mk, salt);

        const kq = await hv.themhocvien(
            mahv,
            hoten,
            gt,
            ngaysinh,
            sdt,
            diachi,
            email,
            mkHash,
            dt,
            lop,
            truong,
            phuhuynh,
            sdtph,
            nganh,
            truongdh,
            cv,
            cn
        );
        if (kq === 1) {
            req.flash("success", "Thêm học viên thành công.");
            res.redirect(`/admin/hocvien`);
        } else {
            req.flash("fail", "Thêm học viên không thành công.");
            res.redirect(`/admin/hocvien`);
        }
    }

    async xemhocvien(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const ma = req.query.mahv;
        const hv = new HocVien();
        const chiNhanh = new ChiNhanh();
        const dsMaCN = await chiNhanh.xemChiNhanh();
        function formatDate(date) {
            if (date !== null) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                return `${year}-${month}-${day}`;
            } else {
                return "0000-00-00";
            }
        }
        const kqHv = await hv.xemthongtin(ma);
        res.render("./admin/hocvien/xem", { hv: kqHv, formatDate, dsMaCN });
    }
    async suahocvien(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const ma = req.query.mahv;
        const hv = new HocVien();

        const chiNhanh = new ChiNhanh();
        const admin = req.session.chinhanh;
        const dsMaCN = await chiNhanh.xemChiNhanh();
        function formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        }
        const kqHv = await hv.xemthongtin(ma);
        res.render("./admin/hocvien/sua", {
            hv: kqHv,
            formatDate,
            dsMaCN,
            admin,
        });
    }
    async suahocvien_action(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const ma = req.query.mahv;
        const {
            hoten,
            gt,
            ngaysinh,
            sdt,
            diachi,
            email,
            dt,
            lop,
            truong,
            phuhuynh,
            sdtph,
            nganh,
            truongdh,
            cv,
            tinhtrang,
        } = req.body;

        let cn;
        if (req.session.chinhanh) {
            cn = req.session.chinhanh;
        } else {
            cn = req.body.chinhanh;
        }

        const hv = new HocVien();
        const kq = await hv.capnhathocvien(
            ma,
            hoten,
            gt,
            ngaysinh,
            sdt,
            diachi,
            email,
            dt,
            lop,
            truong,
            phuhuynh,
            sdtph,
            nganh,
            truongdh,
            cv,
            tinhtrang,
            cn
        );
        if (kq === 1) {
            req.flash("success", "Cập nhật học viên thành công.");
            res.redirect(`/admin/hocvien/xemhocvien?mahv=${ma}`);
        } else {
            req.flash("fail", "Cập nhật học viện không thành công");
            res.redirect(`/admin/hocvien/suahocvien?mahv=${ma}`);
        }
    }
    async xoahocvien(req, res) {
        const ma = req.query.mahv;
        const hv = new HocVien();
        const kq = await hv.xoahocvien(ma);
        if (kq === 1) {
            req.flash("success", "Xóa học viên thành công.");
            res.redirect(`/admin/hocvien/`);
        } else {
            req.flash("fail", "Xóa giáo viên không thành công.");
            res.redirect(`/admin/hocvien/xemhocvien?mahv=${ma}`);
        }
    }
    async resetMK(req, res) {
        const magv = req.query.mahv;
        const gv = new HocVien();
        const giaovien = await gv.xemthongtin(magv);
        const ngaySinh = giaovien[0].NGAY_SINH;
        const date = new Date(ngaySinh);
        const mk = `${date.getDate()}${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}${date.getFullYear()}`;
        const salt = bcrypt.genSaltSync(10);
        const mkHash = await bcrypt.hashSync(mk, salt);
        const kq = await gv.resetMK(magv, mkHash);
        if (kq === 1) {
            req.flash("success", "Cập nhật mật khẩu thành công.");
            res.redirect(`/admin/hocvien`);
        } else {
            req.flash("fail", "Cập nhật mật khẩu thành công.");
            res.render(`/admin/hocvien/xemhocvien?mahv=${magv}`);
        }
    }
}

module.exports = new AdminHocVienController();
