const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, songFile, cb) => {
    const { originalname } = songFile;
    cb(null, originalname);
  },
});

module.exports = storage;
