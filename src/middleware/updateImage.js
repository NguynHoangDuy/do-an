const multer = require("multer");
const GiaoVien = require("../app/models/giaovien");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/img/avatars");
  },
  filename: async function (req, file, cb) {
    const maGV = req.query.magv;
    const filename = "avatar-" + maGV + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({ storage: storage, overwrite: true });

module.exports = upload;
