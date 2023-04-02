const multer = require("multer");
const GiaoVien = require("../app/models/giaovien");
const cloudinary = require("../config/cloudinary.config")
const { CloudinaryStorage } = require('multer-storage-cloudinary');


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ['jpg', 'png'],
 
  params: {
    folder: 'avatars',
    public_id: async (req, file) => {
      let maGV;
      if(req.query.magv){
        maGV = req.query.magv
      }
      else {
        const gv = new GiaoVien();
        maGV = await gv.layMaGV();
      }
     const filename = "avatar-" + maGV;
      return filename;
    }
  }
});


const add = multer({ storage: storage, overwrite: true });

module.exports = add;
