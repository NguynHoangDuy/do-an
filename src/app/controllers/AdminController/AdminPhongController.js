const { getCN } = require("../../models/homePage");
const Phong = require("../../models/phonghoc")
class AdminPhongController {
	async index(req, res) {
		res.locals.quyen = "Quản trị viên";
		res.locals.ten = req.session.ten;
		const maCN = req.query.cn
		const admin = req.session.chinhanh;
		let maChiNhanh
		if (maCN) {
			maChiNhanh = maCN
		}
		else {
			maChiNhanh = admin
		}
		const cn = await getCN()
		const phong = new Phong()
		const listPhong = await phong.getListPhongHoc(maChiNhanh)
		res.render("./admin/phong", { cn, admin, listPhong, maChiNhanh });
	}
	async them(req, res) {
		res.locals.quyen = "Quản trị viên";
		res.locals.ten = req.session.ten;
		const { ten, ma, cn } = req.body
		const admin = req.session.chinhanh;
		let maChiNhanh
		if (cn) {
			maChiNhanh = cn
		}
		else {
			maChiNhanh = admin
		}
		const phong = new Phong()
		const kq = await phong.them(ma, ten, maChiNhanh)
		if (kq === 1) {
			req.flash("success", "Thêm thành công.");
			res.redirect(`/admin/phong`);
		} else {
			req.flash("fail", "Thêm không thành công.");
			res.redirect(`/admin/phong`);
		}
	}
	async them(req, res) {
		res.locals.quyen = "Quản trị viên";
		res.locals.ten = req.session.ten;
		const { ten, ma, cn } = req.body
		const admin = req.session.chinhanh;
		let maChiNhanh
		if (cn) {
			maChiNhanh = cn
		}
		else {
			maChiNhanh = admin
		}
		const phong = new Phong()
		const kq = await phong.them(ma, ten, maChiNhanh)
		if (kq === 1) {
			req.flash("success", "Thêm thành công.");
			res.redirect(`/admin/phong`);
		} else {
			req.flash("fail", "Thêm không thành công.");
			res.redirect(`/admin/phong`);
		}
	}
	async capnhat(req, res) {
		res.locals.quyen = "Quản trị viên";
		res.locals.ten = req.session.ten;
		const { ten, ma, cn } = req.body
		const old = req.params.maphong
		const admin = req.session.chinhanh;
		let maChiNhanh
		if (cn) {
			maChiNhanh = cn
		}
		else {
			maChiNhanh = admin
		}
		const phong = new Phong()
		const kq = await phong.capnhat(ma, ten, maChiNhanh, old)
		if (kq === 1) {
			req.flash("success", "Cập nhật thành công.");
			res.redirect(`/admin/phong`);
		} else {
			req.flash("fail", "Cập nhật không thành công.");
			res.redirect(`/admin/phong`);
		}
	}
	async xoa(req, res) {
		res.locals.quyen = "Quản trị viên";
		res.locals.ten = req.session.ten;
		const old = req.params.maphong

		const phong = new Phong()
		const kq = await phong.xoa(old)
		if (kq === 1) {
			req.flash("success", "Xóa thành công.");
			res.redirect(`/admin/phong`);
		} else {
			req.flash("fail", "Xóa không thành công.");
			res.redirect(`/admin/phong`);
		}
	}
}

module.exports = new AdminPhongController();
