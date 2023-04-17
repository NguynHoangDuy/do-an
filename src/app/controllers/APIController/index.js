const GiaoVien = require("../../models/giaovien");
const PhongHoc = require("../../models/phonghoc");

class APIController {
    async getListGv(req, res) {
        const ma_cn = req.params.macn;
        const gv = new GiaoVien();
        const listGv = await gv.getGvByCN(ma_cn);
        res.json(listGv);
    }
    async getListPh(req, res) {
        const ma_cn = req.params.macn;
        const ph = new PhongHoc();
        const listPh = await ph.getPhonghocByCn(ma_cn);
        res.json(listPh);
    }
}

module.exports = new APIController();
