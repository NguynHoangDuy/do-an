const HocVien = require("../../models/hocvien");
const Lop = require("../../models/lop");
const TKB = require("../../models/thoikhoabieu");
class HocVienController {
    index(req, res) {
        res.locals.quyen = "Học viên";
        res.locals.ten = req.session.ten;
        res.render("./hocvien");
    }

    async thoikhoabieu(req, res) {
        res.locals.quyen = "Học viên";
        res.locals.ten = req.session.ten;
        const mahv = req.session.username;
        const tkb = new TKB();
        const kq = await tkb.getTKbHV(mahv);
        const listTKB = JSON.stringify(kq);
        res.render("./hocvien/thoikhoabieu", { mahv, listTKB });
    }

    async capNhatThongTin(req, res) {
        res.locals.quyen = "Học viên";
        res.locals.ten = req.session.ten;
        const mahv = req.session.username;
        const hV = new HocVien();
        const hv = await hV.xemthongtin(mahv);
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
        res.render("./hocvien/capnhatthongtin", { hv, formatDate });
    }
    async capNhatThongTinAction(req, res) {
        res.locals.quyen = "Học viên";
        res.locals.ten = req.session.ten;
        const mahv = req.session.username;
        const hv = new HocVien();
        let hinh_anh = "";
        if (req.file) {
            hinh_anh = req.file.path;
        } else hinh_anh = "";
        console.log(req.file.path);
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

        const kq = await hv.capnhatthontin(
            mahv,
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
            hinh_anh
        );

        if (kq === 1) {
            req.flash("success", "Cập nhật thông tin thành công.");
            res.redirect(`/hocvien/capnhatthongtin`);
        } else {
            req.flash("fail", "Cập nhật thông tin không thành công");
            res.redirect(`/hocvien/capnhatthongtin`);
        }
    }

    async hocPhi(req, res) {
        res.locals.quyen = "Học viên";
        res.locals.ten = req.session.ten;
        const mahv = req.session.username;
        const lop = new Lop();
        const hocPhi = await lop.xemHocPhi(mahv);
        const tong = await lop.tongHocPhi(mahv);
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
        res.render("./hocvien/hocphi", { hocPhi, tong, formatDate });
    }
}

module.exports = new HocVienController();
