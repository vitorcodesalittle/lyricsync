const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { exec } = require("child_process");
const audioExtensions = require("./audioExtensions");
const storage = require("./multer.config");

var upload = multer({ storage });

const PORT = 3000;

const app = express();

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  next();
});

app.post("/align", upload.single("song"), async (req, res, next) => {
  const lyrics = req.body["lyrics"];
  const songFile = req.file;

  if (!songFile || !lyrics) {
    return res.status(400).json({ message: `Missing "lyrics" or "song"` });
  }

  if (
    !Object.prototype.hasOwnProperty.call(audioExtensions, songFile.mimetype)
  ) {
    return res
      .status(400)
      .json({ message: `Can't convert ${songFile.mimetype} to wav` });
  }

  const { path: songPath, originalname } = songFile;

  const lyricsPath = `./uploads/${originalname}_lyrics.txt`;

  fs.writeFileSync(lyricsPath, lyrics);

  // rodar o align.py
  try {
    const result = await new Promise((resolve, reject) => {
      const cmd = `python ../align.py ${songPath} ${lyricsPath}`;
      exec(cmd, (err, stdout) => {
        if (err) {
          return reject(err);
        }
        return resolve(stdout);
      });
    });
    const resultPathRegex = /\.\/results.*\.json/;
    const [resultPath] = result.match(resultPathRegex);
    const buf = fs.readFileSync("." + resultPath);
    const json = buf.toString("utf-8");
    return res.status(200).send(json);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Whoops");
  }
});

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
