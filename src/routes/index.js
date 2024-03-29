const guestRouter = require("./guest");
const adminRouter = require("./admin");
const adminHocVienRouter = require("./admin/hocvien");
const adminGiaoVienRouter = require("./admin/giaovien");
const adminKhoaHocRouter = require("./admin/khoahoc");
const adminMoDangKyRouter = require("./admin/modangky");
const adminLuongRouter = require("./admin/luong");
const adminThongKeRouter = require("./admin/thongke");
const adminPhongRouter = require("./admin/phong");
const adminBaiVietRouter = require("./admin/baiviet");
const adminDiemSoRouter = require("./admin/demso");
const adminDanhMucKHRouter = require("./admin/danhmuc");
const adminLopRouter = require("./admin/lop");
const giaoVienRouter = require("./giaovien");
const hocVienDKKhoaHocRouter = require("./hocvien/dangkykhoahoc");
const hocVienDKLopRouter = require("./hocvien/dangkylop");
const hocVienRouter = require("./hocvien");
const guestBaiVietRouter = require("./guest/baiviet");
const APIRouter = require("./API/index");
function route(app) {
    app.use("/admin/diemso", adminDiemSoRouter);
    app.use("/admin/baiviet", adminBaiVietRouter);
    app.use("/admin/modangky", adminMoDangKyRouter);
    app.use("/admin/khoahoc", adminKhoaHocRouter);
    app.use("/admin/hocvien", adminHocVienRouter);
    app.use("/admin/giaovien", adminGiaoVienRouter);
    app.use("/admin/luong", adminLuongRouter);
    app.use("/admin/phong", adminPhongRouter);
    app.use("/admin/thongke", adminThongKeRouter);
    app.use("/admin/dmkh", adminDanhMucKHRouter);
    app.use("/admin/lop", adminLopRouter);
    app.use("/admin", adminRouter);
    app.use("/giaovien", giaoVienRouter);
    app.use("/hocvien/dangkykhoahoc", hocVienDKKhoaHocRouter);
    app.use("/hocvien/dangkylop", hocVienDKLopRouter);
    app.use("/hocvien", hocVienRouter);
    app.use("/baiviet", guestBaiVietRouter);
    app.use("/api", APIRouter);
    app.use("/", guestRouter);
    app.use(function (req, res, next) {
        res.status(404).send("Sorry, we couldn't find that resource!");
    });
}

module.exports = route;
