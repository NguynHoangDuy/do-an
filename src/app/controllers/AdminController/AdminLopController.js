const Lop = require("../../models/lop");
const TKB = require("../../models/thoikhoabieu");
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
        const { SO_LUONG, MA_GV } = req.body;
        const lop = new Lop();
        const kq = await lop.capNhatLop(MA_GV, SO_LUONG, MA_LOP);
        res.json(kq);
    }
    async removeLop(req, res) {
        const MA_LOP = req.params.malop;
        const lop = new Lop();
        const kq = await lop.xoaLop(MA_LOP);
        res.json(kq);
    }

    async addTkb(req, res) {
        const { MA_THU, MA_LOP, MA_TG, MA_PHONG } = req.body;
        const tkbTT = { MA_THU, MA_LOP, MA_TG, MA_PHONG };
        const tkb = new TKB();
        const kq = await tkb.themTKB(tkbTT);
        res.json(kq);
    }
}

module.exports = new AdminLopController();
