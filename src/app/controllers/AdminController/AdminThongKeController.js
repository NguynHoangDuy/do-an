const ExcelJS = require('exceljs');
const { getSumHocPhi, getNamHv, tkHocVien, getListHocPhiEx } = require("../../models/hocphi");
const {
    getThangHP,
    getNamHP,
    countListHP,
    getListHocPhi,
    getTongHP,
} = require("../../models/hocphi");
const { getSumLuongGVNAM } = require("../../models/luong");

class AdminThongKeController {
    async index(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;

        res.render("./admin/thongke");
    }

    async hocphi(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const admin = req.session.chinhanh;
        let THANG, NAM;
        const currentDate = new Date();
        const thang = await getThangHP();
        const nam = await getNamHP();
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
        let perPage = 20; // số lượng sản phẩm xuất hiện trên 1 page
        let page = parseInt(req.query.trang) || 1;
        const offset = (page - 1) * perPage;
        const totalCount = await countListHP(THANG, NAM, admin);
        const totalPages = Math.ceil(totalCount / perPage);

        const hocphi = await getListHocPhi(offset, perPage, THANG, NAM, admin);
        const tong = await getTongHP(THANG, NAM, admin);
        res.render("./admin/thongke/thongkehocphi", {
            thang,
            nam,
            THANG,
            NAM,
            hocphi,
            tong,
            current: page,
            pages: totalPages,
            perPage: perPage,
        });
    }

    async xuatHocPhi(req,res)
    {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const admin = req.session.chinhanh;
        let THANG =  req.query.thang
        let  NAM = req.query.nam;

        const rows = await getListHocPhiEx(THANG, NAM, admin)
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Data');

        // Add column headers
        const headers = Object.keys(rows[0]);
        worksheet.getRow(1).values = headers;

        // Add data rows
        for (let i = 0; i < rows.length; i++) {
        const rowValues = Object.values(rows[i]);
        worksheet.addRow(rowValues);
        }
        const fileName= `thong-ke-hoc-phi-thang-${THANG}-nam-${NAM}${admin?"-"+admin:""}.xlsx`
        // Generate the Excel file buffer
        workbook.xlsx.writeBuffer()
        .then((buffer) => {
            // Set the response headers for file download
            res.set('Content-Disposition', `attachment; filename=${fileName}`);
            res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.send(buffer);
        })
        .catch((err) => {
            console.error('Error generating Excel file:', err);
            res.status(500).json({ error: 'Failed to generate Excel file' });
        });

    }

    async thuChi(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const admin = req.session.chinhanh;
        const currentDate = new Date();
        let NAM;
        if (req.query.nam) {
            NAM = req.query.nam;
        } else {
            NAM = currentDate.getFullYear();
        }
        const nam = await getNamHP();
        const hocphi = JSON.stringify(await getSumHocPhi(NAM, admin));
        const luong = JSON.stringify(await getSumLuongGVNAM(NAM, admin));
        res.render("./admin/thongke/thongkethuchi", {
            nam,
            hocphi,
            luong,
            NAM,
        });
    }
    async dangKy(req, res) {
        res.locals.quyen = "Quản trị viên";
        res.locals.ten = req.session.ten;
        const admin = req.session.chinhanh;
        const currentDate = new Date();
        let NAM;
        if (req.query.nam) {
            NAM = req.query.nam;
        } else {
            NAM = currentDate.getFullYear();
        }

        const nam = await getNamHv();
        const hocvien = JSON.stringify(await tkHocVien(NAM, admin));
        res.render("./admin/thongke/thongkedangky", { nam, NAM, hocvien });
    }
}

module.exports = new AdminThongKeController();
