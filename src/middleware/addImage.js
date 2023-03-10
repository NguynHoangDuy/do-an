const multer = require("multer");
const GiaoVien = require("../app/models/giaovien");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/img/avatars");
  },
  filename: async function (req, file, cb) {
    const gv = new GiaoVien();
    const maGV = await gv.layMaGV();
    const filename = "avatar-" + maGV + path.extname(file.originalname);
    cb(null, filename);
  },
});

const add = multer({ storage: storage, overwrite: true });

module.exports = add;
