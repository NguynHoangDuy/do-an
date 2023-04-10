const multer = require("multer");
const cloudinary = require("../config/cloudinary.config")
const { CloudinaryStorage } = require('multer-storage-cloudinary');


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ['jpg', 'png'],
 
  params: {
    folder: 'avatars',
    public_id: async (req, file) => {
      return Date.now() + '-' + file.originalname
    }
  }
});


const add = multer({ storage: storage, overwrite: true });

module.exports = add;
