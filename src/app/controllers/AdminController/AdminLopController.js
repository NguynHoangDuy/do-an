const Lop = require("../../models/lop");
class AdminLopController {
    async addNewLop(req, res) {
        const { SO_LUONG, TEN_LOP, MA_GV, MA_KHCC } = req.body;
        const lopTT = { SO_LUONG, TEN_LOP, MA_GV, MA_KHCC };
        const lop = new Lop();
        const kq = await lop.themLop(lopTT);
        res.json(kq);
    }
    async updateLop(req, res) {
        const MA_LOP = req.params.malop;
        const { SO_LUONG, TEN_LOP, MA_GV, MA_KHCC } = req.body;
        const lopTT = { SO_LUONG, TEN_LOP, MA_GV, MA_KHCC };
        const lop = new Lop();
        const kq = await lop.capNhatLop(lopTT, MA_LOP);
        res.json(kq);
    }
    async removeLop(req, res) {
        const MA_LOP = req.params.malop;
        const lop = new Lop();
        const kq = await lop.xoaLop(MA_LOP);
        res.json(kq);
    }
}

module.exports = new AdminLopController();
