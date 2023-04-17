const BaiViet = require("../../models/bai_viet");

class GuestController {
    async chitiet(req, res) {
        const id = req.params.id;
        const baiviet = new BaiViet();
        const posts = await baiviet.getById(id);
        const post = posts[0];
        res.render("./guest/single-post", { post });
    }
}

module.exports = new GuestController();
