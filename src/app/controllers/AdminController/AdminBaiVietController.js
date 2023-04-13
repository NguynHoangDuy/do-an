const BaiViet = require("../../models/bai_viet");
const iconv = require("iconv-lite");
class AdminBaiVietController {
    async index(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        let perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page
        let page = parseInt(req.query.trang) || 1;
        const offset = (page - 1) * perPage;
        const baiviet = new BaiViet();
        const totalCount = await baiviet.count();
        const totalPages = Math.ceil(totalCount / perPage);
        const bvList = await baiviet.getAll(offset, perPage);
        function formatDate(dateString) {
            const date = new Date(dateString);
            const formattedDate = `${date.getDate()}/${
                date.getMonth() + 1
            }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            return formattedDate;
        }
        res.render("./admin/baiviet", {
            bvList,
            current: page,
            pages: totalPages,
            perPage: perPage,
            formatDate,
        });
    }
    async them(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;

        res.render("./admin/baiviet/them");
    }
    async themAction(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        let hinh_anh;
        const { tieu_de, noi_dung } = req.body;
        if (req.file) {
            hinh_anh = req.file.path;
        } else hinh_anh = "";
        const strWithoutDiacritics = iconv.encode(tieu_de, "ascii").toString();
        const url = strWithoutDiacritics
            .replace(/[^a-zA-Z0-9]/g, "-")
            .normalize("NFKD")
            .toLowerCase()
            .replace(/\s+/g, "-");
        console.log(url);
        const ngay_tao = new Date();
        const ma_qtv = req.session.username;
        const post = {
            tieu_de,
            noi_dung,
            hinh_anh,
            ngay_tao,
            trang_thai: "true",
            ma_qtv,
            url,
        };
        const baiviet = new BaiViet();
        const kq = await baiviet.create(post);
        if (kq === 1) {
            req.flash("success", "Thêm bài viết thành công.");
            res.redirect("/admin/baiviet");
        } else {
            req.flash("fail", "Thêm bài viết không thành công");
            res.redirect("/admin/baiviet");
        }
    }
}

module.exports = new AdminBaiVietController();
