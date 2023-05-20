const ThoiKhoaBieu = require("../../models/thoikhoabieu");
const GiaoVien = require("../../models/giaovien");
const { getLuongGV, getThang, getNam } = require("../../models/luong");
class GiaoVienController {
    index(req, res) {
        res.locals.quyen = "Giáo viên";
        res.locals.ten = req.session.ten;
        res.render("./giaovien/index");
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

    async capNhatThongTin(req, res) {
        res.locals.quyen = "Giáo viên";
        res.locals.ten = req.session.ten;
        const magv = req.session.username;
        const gv = new GiaoVien();
        const kq = await gv.xemthongtin(magv);
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
        res.render("./giaovien/capnhatthongtin", {
            kq,
            formatDate,
        });
    }

    async suathongtin_action(req, res) {
        res.locals.quyen = "Giáo viên";
        res.locals.ten = req.session.ten;
        const magv = req.session.username;
        const { hoten, gt, ngaysinh, sdt, diachi, email, trinhdo } = req.body;
        const gv = new GiaoVien();
        const kq = await gv.xemthongtin(magv);
        let anh_dd;
        if (req.file) {
            anh_dd = req.file.path;
        } else anh_dd = kq.ANH_DD;
        let cn = kq.MA_CHI_NHANH;
        const kqCN = await gv.capnhatgiaovien(
            magv,
            hoten,
            gt,
            ngaysinh,
            sdt,
            diachi,
            email,
            trinhdo,
            anh_dd,
            cn
        );
        if (kqCN === 1) {
            req.flash("success", "Cập nhật giáo viên thành công.");
            res.redirect(`/giaovien/capnhatthongtin`);
        } else {
            req.flash("fail", "Cập nhật giáo viên không thành công.");
            res.redirect(`/giaovien/capnhatthongtin`);
        }
    }

    async luongGV(req, res) {
        res.locals.quyen = "Giáo viên";
        res.locals.ten = req.session.ten;
        const magv = req.session.username;
        const currentDate = new Date();
        let THANG, NAM;
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
        const luong = await getLuongGV(THANG, NAM, magv);

        console.log(luong);
        res.render("./giaovien/luong", { thang, nam, THANG, NAM, luong });
    }
}

module.exports = new GiaoVienController();
