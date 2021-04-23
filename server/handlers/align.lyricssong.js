const multer = require("multer");
const fs = require("fs");
const alignWrapper = require("../lib/alignWrapper");
const storage = require("../multer.config");

const upload = multer({ storage });

module.exports = [
  upload.single("song"),
  async (req, res, next) => {
    const lyrics = req.body["lyrics"];
    const songFile = req.file;

    let a = "";

    if (!songFile || !lyrics) {
      return res.status(400).json({ message: `Missing "lyrics" or "song"` });
    }

    if (
      !Object.prototype.hasOwnProperty.call(audioExtensions, songFile.mimetype)
    ) {
      return res.status(400).json({
        message: `Can't convert ${
          songFile.mimetype
        } to wav. Current options are ${Object.keys(audioExtensions).join(
          ", "
        )}`,
      });
    }

    const { path: songPath, originalname } = songFile;

    const lyricsPath = `./uploads/${originalname}_lyrics.txt`;

    fs.writeFileSync(lyricsPath, lyrics);

    try {
      const stdout = alignWrapper(songPath, lyricsPath);
      const resultPathRegex = /\.\/results.*\.json/;
      const [resultPath] = stdout.match(resultPathRegex);
      const buf = fs.readFileSync("." + resultPath);
      const json = buf.toString("utf-8");
      return res.status(200).send(json);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Whoops");
    }
  },
];
