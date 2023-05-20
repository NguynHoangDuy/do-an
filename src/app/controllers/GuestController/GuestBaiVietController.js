const BaiViet = require("../../models/bai_viet");

class GuestController {
    async chitiet(req, res) {
        const id = req.params.id;
        const baiviet = new BaiViet();
        const bv = await baiviet.getById(id);
        const posts = await baiviet.getLatestPosts();
        const post = bv[0];
        res.render("./guest/single-post", { post, posts });
    }
}

module.exports = new GuestController();
