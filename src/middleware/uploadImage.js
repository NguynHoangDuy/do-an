const multer = require("multer");
const GiaoVien = require("../app/models/giaovien");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "/src/public/img/avatars";
    if (!fs.existsSync(dir)) {
      fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) return cb(err);
        cb(null, dir);
      });
    } else {
      cb(null, dir);
    }
  },
  filename: async function (req, file, cb) {
    const gv = new GiaoVien();
    const maGV = await gv.layMaGV();
    // const maGV = "ALFGV002";
    const filename = "avatar-" + maGV + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
