const GiaoVien = require("../../models/giaovien");
const PhongHoc = require("../../models/phonghoc");
const ThoiGian = require("../../models/thoigian")
class APIController {
    async getListGv(req, res) {
        const ma_cn = req.params.macn;
        const gv = new GiaoVien();
        const listGv = await gv.getGvByCN(ma_cn);
        res.json(listGv);
    }
    async getListPh(req, res) {
        const { MA_CN, MA_THU, TG_BD, TG_KT } = req.query;
        const ph = new PhongHoc();
        const listPh = await ph.getPhonghocByCn(MA_CN, MA_THU, TG_BD, TG_KT);
        res.json(listPh);
    }

    async getListTgDay(req, res) {
        const { MA_GV, MA_THU } = req.query;
        const ph = new ThoiGian();
        const listPh = await ph.getThoiGianGv(MA_GV, MA_THU)
        res.json(listPh);
    }
}

module.exports = new APIController();
