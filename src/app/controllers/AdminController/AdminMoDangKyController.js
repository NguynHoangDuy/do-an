const MoDangKy = require("../../models/modangky");
const KhoaHoc = require("../../models/khoahoc");
const ChiNhanh = require("../../models/chinhanh");
const GiaoVien = require("../../models/giaovien");
class AdminKhoaHocController {
    async index(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        let perPage = 2;
        const chiNhanh = new ChiNhanh();
        const admin = req.session.chinhanh;
        const dsMaCN = await chiNhanh.xemChiNhanh();
        let page = parseInt(req.query.trang) || 1;
        const offset = (page - 1) * perPage;
        const makh = req.query.maKH;
        const tenkh = req.query.tenKH;
        const khoahoc = new KhoaHoc();
        const dsMaKH = await khoahoc.dsKhoaHocAll();
        const modangky = new MoDangKy();

        function formatMoney(num) {
            return Number(num).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            });
        }
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

        if (!makh && !tenkh) {
            const totalCount = await modangky.demMoDangKy(
                "",
                "",
                req.session.chinhanh
            );
            const totalPages = Math.ceil(totalCount / perPage);
            const listKH = await modangky.listMoDangKy(
                offset,
                perPage,
                req.session.chinhanh
            );
            res.render("./admin/modangky", {
                listKH,
                formatDate,
                formatMoney,
                current: page,
                pages: totalPages,
                perPage: perPage,
                dsMaKH,
                tk: false,
                admin,
                dsMaCN,
            });
        } else {
            const totalCount = await modangky.demMoDangKy(
                makh,
                tenkh,
                req.session.chinhanh
            );
            const totalPages = Math.ceil(totalCount / perPage);
            const listKH = await modangky.timkiemKH(
                offset,
                perPage,
                makh,
                tenkh,
                req.session.chinhanh
            );
            res.render("./admin/modangky", {
                listKH,
                formatDate,
                formatMoney,
                current: page,
                dsMaKH,
                pages: totalPages,
                perPage: perPage,
                tk: true,
                makh,
                tenkh,
                admin,
                dsMaCN,
            });
        }
    }
    async danhSachLop(req, res) {
        const maKH = req.params.makh;
        const moDangKy = new MoDangKy();
        const dslop = await moDangKy.xemDsLop(maKH);
        if (dslop) {
            res.json(dslop);
        }
    }
    async moDangKy(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const { makh, ngaybd, ngaykt, hocphi, tt } = req.body;
        const khoahoc = new KhoaHoc();
        let cn;
        if (req.session.chinhanh) {
            cn = req.session.chinhanh;
        } else {
            cn = req.body.chinhanh;
        }
        const kq = await khoahoc.moDangKy(makh, ngaybd, ngaykt, hocphi, tt, cn);
        if (kq === 1) {
            req.flash("success", "Mở đăng ký thành công.");
            res.redirect(`/admin/modangky`);
        } else {
            req.flash("fail", "Mở đăng ký không thành công.");
            res.redirect(`/admin/modangky`);
        }
    }

    async capNhat(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const maKHCC = req.query.makhcc;

        const { makh, ngaybd, ngaykt, hocphi, tt } = req.body;
        let cn;
        if (req.session.chinhanh) {
            cn = req.session.chinhanh;
        } else {
            cn = req.body.chinhanh;
        }
        const modangky = new MoDangKy();
        const kq = await modangky.capnhat(
            maKHCC,
            makh,
            ngaybd,
            ngaykt,
            hocphi,
            tt,
            cn
        );
        if (kq === 1) {
            req.flash("success", "Cập nhật thành công.");
            res.redirect(`/admin/modangky`);
        } else {
            req.flash("fail", "Cập nhật không thành công.");
            res.redirect(`/admin/modangky`);
        }
    }

    async xoa(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const maKHCC = req.query.makhcc;
        const modangky = new MoDangKy();
        const kq = await modangky.xoaModangky(maKHCC);
        if (kq === 1) {
            req.flash("success", "Xóa thành công.");
            res.redirect(`/admin/modangky`);
        } else {
            req.flash("fail", "Xóa không thành công.");
            res.redirect(`/admin/modangky`);
        }
    }

    async xemtkb(req, res) {
        const malop = req.params.malop;
        const moDangKy = new MoDangKy();
        const dsTkb = await moDangKy.xemTKB(malop);
        if (dsTkb) {
            res.json(dsTkb);
        }
    }
}

module.exports = new AdminKhoaHocController();
