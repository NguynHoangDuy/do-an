const QuanTriVien = require("../../models/quantrivien");
const HocVien = require("../../models/hocvien");
const GiaoVien = require("../../models/giaovien");
const BaiViet = require("../../models/bai_viet");
const bcrypt = require("bcrypt");
const ChiNhanh = require("../../models/chinhanh");
const crypto = require("crypto");
const {
    bannerImage,
    danhMucKh,
    getCN,
    getKH,
    getAllBV,
    search,
    hocVien,
} = require("../../models/homePage");
const nodemailer = require("nodemailer");
class GuestController {
    async index(req, res) {
        const banner = await bannerImage();
        const baiviet = new BaiViet();
        const posts = await baiviet.getLatestPosts();
        const dmKH = await danhMucKh();
        const cn = await getCN();
        const hocvien = await hocVien();
        res.render("index", { banner, posts, dmKH, cn, hocvien });
    }
    async giaovien(req, res) {
        res.render("giaovien");
    }
    async khoahoc(req, res) {
        const dmKH = await danhMucKh();
        let listKH = [];
        for (let i = 0; i < dmKH.length; i++) {
            const kh = await getKH(dmKH[i].MA_DM);
            if (kh.length !== 0) listKH = [...listKH, kh];
        }
        const baiviet = new BaiViet();
        const posts = await baiviet.getLatestPosts();
        res.render("khoahoc", { listKH, posts });
    }
    async baiviet(req, res) {
        const posts = await getAllBV();
        res.render("baiviet", { posts });
    }
    async timkiem(req, res) {
        const timKiem = req.query.s;
        const listKH = await search(timKiem);
        const baiviet = new BaiViet();
        const posts = await baiviet.getLatestPosts();
        res.render("timkiem", { listKH, timKiem, posts });
    }
    loginForm(req, res) {
        res.render("guest/Registor/login");
    }
    async dangKyForm(req, res) {
        const chiNhanh = new ChiNhanh();
        const dsMaCN = await chiNhanh.xemChiNhanh();
        res.render("guest/Registor/dangky", { dsMaCN });
    }
    xacNhan(req, res) {
        const token = crypto.randomBytes(3).toString("hex");
        const user = { ...req.body, confirm: token };

        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "duy.nh.61cntt@ntu.edu.vn",
                pass: "0932491613",
            },
        });

        const mailOptions = {
            from: req.body.email,
            to: user.email,
            subject: "Xác nhận tài khoản của bạn",
            text: `Mã xác nhận đăng ký học viên của bạn là: ${token}`,
        };
        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log(err);
            }
        });
        req.session.registor = user;
        res.render("guest/Registor/confirm-email");
    }
    async xacNhanAction(req, res) {
        const madk = req.body.madk;
        const user = req.session.registor;
        console.log(user);
        const hoten = user.email.substring(0, user.email.indexOf("@"));
        const salt = bcrypt.genSaltSync(10);
        const mk = bcrypt.hashSync(user.password, salt);
        if (madk === user.confirm) {
            const hv = new HocVien();
            const mahv = await hv.layMaHV();
            console.log(mahv);
            const kq = await hv.dangKyHV(
                mahv,
                hoten,
                user.email,
                mk,
                user.chinhanh
            );
            if (kq === 1) {
                req.flash(
                    "noti",
                    `<p>Đăng ký thành công</p>
                <p>Tên đăng nhập: ${mahv}</p> 
                <p>Vui lòng đăng nhập và cập nhật thông tin cá nhân</p>`
                );
                res.redirect(`/dangnhap`);
            } else {
                req.flash("noti", `<p>Đăng ký không thành công</p>`);
                res.redirect(`/dangky`);
            }
        } else {
            req.flash("noti", `<p>Đăng ký không thành công</p>`);
            res.redirect(`/dangky`);
        }
    }

    async dangnhap(req, res) {
        const qtv = new QuanTriVien();
        const gv = new GiaoVien();
        const hv = new HocVien();
        const { username, password } = req.body;
        let loginQTV = await qtv.dangnhap(username);
        let loginGV = await gv.dangnhap(username);
        let loginHV = await hv.dangnhap(username);
        if (username && password) {
            if (
                loginQTV.length === 0 &&
                loginGV.length === 0 &&
                loginHV.length === 0
            ) {
                res.redirect("/dangnhap");
                return;
            }
            if (loginQTV.length !== 0) {
                bcrypt.compare(password, loginQTV[0].MAT_KHAU, (err, kq) => {
                    if (kq) {
                        req.session.loggedin = true;
                        req.session.quyen = loginQTV[0].MA_QUYEN;
                        req.session.ten = loginQTV[0].MA_QTV;
                        req.session.username = loginQTV[0].MA_QTV;
                        req.session.chinhanh = loginQTV[0].MA_CHI_NHANH;
                        res.redirect("./admin");
                        return;
                    } else {
                        res.redirect("/dangnhap");
                        return;
                    }
                });
            }
        }
        if (loginGV.length !== 0) {
            bcrypt.compare(password, loginGV[0].MAT_KHAU, (err, kq) => {
                if (kq) {
                    req.session.loggedin = true;
                    req.session.quyen = loginGV[0].MA_QUYEN;
                    req.session.ten = loginGV[0].HO_TEN;
                    req.session.username = loginGV[0].MA_GV;
                    req.session.chinhanh = loginGV[0].MA_CHI_NHANH;
                    res.redirect("./giaovien");
                    return;
                } else {
                    res.redirect("/dangnhap");
                    return;
                }
            });
        }
        if (loginHV.length !== 0) {
            bcrypt.compare(password, loginHV[0].MAT_KHAU, (err, kq) => {
                if (kq) {
                    req.session.loggedin = true;
                    req.session.quyen = loginHV[0].MA_QUYEN;
                    req.session.ten = loginHV[0].HO_TEN;
                    req.session.username = loginHV[0].MA_HV;
                    req.session.chinhanh = loginHV[0].MA_CHI_NHANH;

                    console.log("Đăng nhập");
                    res.redirect("./hocvien");
                    return;
                } else {
                    console.log("Không thành công");
                    res.redirect("/dangnhap");
                    return;
                }
            });
        }
    }
    dangxuat(req, res) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            }
            res.redirect("/");
        });
    }
}

module.exports = new GuestController();
