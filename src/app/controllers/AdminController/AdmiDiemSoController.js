const { demHv, getAllHv, themDiemSo, xoa } = require("../../models/diem_so");
class AdminHocVienController {
    async index(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        let perPage = 20; // số lượng sản phẩm xuất hiện trên 1 page
        let page = parseInt(req.query.trang) || 1;
        const offset = (page - 1) * perPage;
        const totalCount = await demHv(req.session.chinhanh);
        const totalPages = Math.ceil(totalCount / perPage);
        const listHv = await getAllHv(offset, perPage, req.session.chinhanh);
        res.render("./admin/diemso", {
            listHv: listHv,
            current: page,
            pages: totalPages,
            perPage: perPage,
        });
    }

    async themhocvien_action(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const { maHV, kyThi, diem } = req.body;
        const kq = await themDiemSo(maHV, kyThi, diem);
        if (kq === 1) {
            req.flash("success", "Thêm học viên thành công.");
            res.redirect(`/admin/diemso`);
        } else {
            req.flash("fail", "Thêm học viên không thành công.");
            res.redirect(`/admin/diemso`);
        }
    }

    async xoahocvien(req, res) {
        const ma = req.query.id;
        const kq = await xoa(ma);
        if (kq === 1) {
            req.flash("success", "Xóa học viên thành công.");
            res.redirect(`/admin/diemso`);
        } else {
            req.flash("fail", "Xóa giáo viên không thành công.");
            res.redirect(`/admin/diemso`);
        }
    }
}

module.exports = new AdminHocVienController();
