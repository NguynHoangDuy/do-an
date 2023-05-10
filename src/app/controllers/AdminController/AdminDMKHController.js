const MoDangKy = require("../../models/modangky");
const KhoaHoc = require("../../models/khoahoc");
const ChiNhanh = require("../../models/chinhanh");
const Lop = require("../../models/lop");
const {
    getAll,
    add,
    update,
    remove,
    getKHinDM,
    getListMDK,
    demMoDangKy,
    getDM,
} = require("../../models/dm_kh");
class AdminKhoaHocController {
    async index(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;

        const listDM = await getAll();

        res.render("./admin/danhmucKH", { listDM });
    }

    async them(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const { tenDM } = req.body;
        let anh_dd;
        if (req.file) {
            anh_dd = req.file.path;
        } else anh_dd = "";
        const kq = await add(tenDM, anh_dd);
        if (kq === 1) {
            req.flash("success", "Thêm khóa học thành công.");
            res.redirect(`/admin/dmkh`);
        } else {
            req.flash("fail", "Thêm khóa học không thành công.");
            res.redirect(`/admin/dmkh`);
        }
    }
    async capNhat(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const maDM = req.query.madm;
        const dm = await getDM(maDM)
        const { tenDM } = req.body;
        let anh_dd;
        if (req.file) {
            anh_dd = req.file.path;
        } else anh_dd = dm.ANH_DD;
        console.log(req.fike)
        console.log(anh_dd)
        const kq = await update(maDM, tenDM, anh_dd);
        if (kq === 1) {
            req.flash("success", "Cập nhật khóa học thành công.");
            res.redirect(`/admin/dmkh`);
        } else {
            req.flash("fail", "Cập nhật khóa học không thành công.");
            res.redirect(`/admin/dmkh`);
        }
    }
    async xoa(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const maDM = req.query.madm;
        const kq = await remove(maDM);
        if (kq === 1) {
            req.flash("success", "Xóa khóa học thành công.");
            res.redirect(`/admin/dmkh`);
        } else {
            req.flash("fail", "Xóa khóa học không thành công.");
            res.redirect(`/admin/dmkh`);
        }
    }

    async khoahoc(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const maDM = req.params.madm;
        const admin = req.session.chinhanh;
        const listKH = await getKHinDM(maDM, admin);
        res.render("./admin/danhmucKH/dskhoahoc", { listKH });
    }

    async modangky(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        let perPage = 10;
        const makh = req.params.makh;
        const chiNhanh = new ChiNhanh();
        const admin = req.session.chinhanh;
        const dsMaCN = await chiNhanh.xemChiNhanh();
        let page = parseInt(req.query.trang) || 1;
        const offset = (page - 1) * perPage;
        const khoahoc = new KhoaHoc();
        const dsMaKH = await khoahoc.dsKhoaHocAll();
        const maDM = req.params.madm;
        const listKH = await getListMDK(offset, perPage, admin, makh);
        console.log(admin, makh, maDM);
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
        const totalCount = await demMoDangKy(admin, makh);
        const totalPages = Math.ceil(totalCount / perPage);
        res.render("./admin/danhmucKH/dsmodangky", {
            listKH,
            formatDate,
            formatMoney,
            current: page,
            pages: totalPages,
            perPage: perPage,
            dsMaKH,
            admin,
            dsMaCN,
            maDM,
        });
    }

    async dsLop(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const makhcc = req.params.makhcc;

        const modangky = new MoDangKy();
        const listLop = await modangky.xemDsLop(makhcc);
        console.log(listLop);
        res.render("./admin/danhmucKH/dslop", { listLop });
    }

    async dsHocVien(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const malop = req.params.malop;
        const lop = new Lop();
        let perPage = 20; // số lượng sản phẩm xuất hiện trên 1 page
        let page = parseInt(req.query.trang) || 1;
        const offset = (page - 1) * perPage;
        const totalCount = await lop.demHocVien(malop);
        const totalPages = Math.ceil(totalCount / perPage);

        const { maHv, tenHv } = req.query;
        if (!maHv && !tenHv) {
            const listHv = await lop.hocVien(offset, perPage, malop);
            res.render("./admin/danhmucKH/dshocvien", {
                listHv,
                current: page,
                pages: totalPages,
                perPage: perPage,
            });
        } else {
            const listHv = await lop.timKiemHV(malop, maHv, tenHv);
            console.log(listHv);
            res.render("./admin/danhmucKH/dshocvien", { listHv, tk: true });
        }
    }

    async themHV(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const malop = req.params.malop;
        const lop = new Lop();
        const { maHv } = req.body;
        console.log(maHv);
        const kq = await lop.themHocVien(malop, maHv);
        console.log(kq);
        if (kq === 1) {
            req.flash("success", "Mở đăng ký thành công.");
            res.redirect(`/admin/lop/hocvien/${malop}`);
        } else {
            req.flash("fail", "Mở đăng ký không thành công.");
            res.redirect(`/admin/lop/hocvien/${malop}`);
        }
    }
    async themHV(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const malop = req.params.malop;
        const lop = new Lop();
        const { maHv } = req.body;
        console.log(maHv);
        const kq = await lop.themHocVien(malop, maHv);
        console.log(kq);
        if (kq === 1) {
            req.flash("success", "Thêm thành công.");
            res.redirect(`/admin/lop/hocvien/${malop}`);
        } else {
            req.flash("fail", "Thêm không thành công.");
            res.redirect(`/admin/lop/hocvien/${malop}`);
        }
    }
    async xoaHV(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const malop = req.params.malop;
        const lop = new Lop();
        const maHv = req.params.mahv;
        const kq = await lop.xoaHocVien(malop, maHv);

        if (kq === 1) {
            req.flash("success", "Xóa thành công.");
            res.redirect(`/admin/lop/hocvien/${malop}`);
        } else {
            req.flash("fail", "Xóa không thành công.");
            res.redirect(`/admin/lop/hocvien/${malop}`);
        }
    }
    async hocPhiHV(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const malop = req.params.malop;
        const lop = new Lop();
        const maHv = req.params.mahv;
        const kq = await lop.hocPhi(malop, maHv);

        if (kq === 1) {
            req.flash("success", "Đóng thành công.");
            res.redirect(`/admin/lop/hocvien/${malop}`);
        } else {
            req.flash("fail", "Đóng không thành công.");
            res.redirect(`/admin/lop/hocvien/${malop}`);
        }
    }
}

module.exports = new AdminKhoaHocController();
