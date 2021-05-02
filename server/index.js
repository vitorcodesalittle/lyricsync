const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { exec } = require("child_process");
const audioExtensions = require("./audioExtensions");
const storage = require("./multer.config");

var upload = multer({ storage });

const PORT = 80;
const ORIGIN = "http://localhost";
const app = express();

const downloadSong = (youtubeURL, outputPath) => {
  return new Promise((resolve, reject) => {
    const cmd = `python -m aeneas.tools.download ${youtubeURL} ${outputPath} --smallest-audio`;
    exec(cmd, (err, stdout) => {
      if (err) {
        return reject(err);
      }
      console.log("DOWNLOAD LOG");
      console.log(stdout);
      return resolve();
    });
  });
};

const convertToWav = (audioPath, wavPath) => {
  return new Promise((resolve, reject) => {
    const cmd = `ffmpeg -i ${audioPath} ${wavPath} -y`;
    exec(cmd, (err, stdout) => {
      if (err) {
        return reject(err);
      }
      console.log("CONVERT TO WAV LOG");
      console.log(stdout);
      return resolve();
    });
  });
};

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  next();
});

app.use(express.static("./client"));
app.use("/uploads", express.static("./uploads"));

app.post("/align", upload.single("song"), async (req, res, next) => {
  try {
    const lyrics = req.body["lyrics"];
    const lang = req.body["lang"];
    const song = req.body["song"];

    const youtubeURL = new URL(song);
    const isEncurted = youtubeURL.origin === "https://www.youtu.be";
    const youtubeId = !isEncurted
      ? youtubeURL.searchParams.get("v")
      : youtubeURL.pathname.slice(1);

    if (!song || !lyrics) {
      return res.status(400).json({ message: `Missing "lyrics" or "song"` });
    }

    // baixar
    const rawAudioPath = `./uploads/${youtubeId}_raw`;
    await downloadSong(youtubeURL, rawAudioPath);

    // converter pra wav
    const songPath = `./uploads/${youtubeId}.wav`; // o .wav final
    const originalname = youtubeId;
    await convertToWav(rawAudioPath, songPath);

    const lyricsPath = `./uploads/${originalname}_lyrics.txt`;

    fs.writeFileSync(lyricsPath, lyrics);
    // rodar o align.py
    const result = await new Promise((resolve, reject) => {
      const cmd = `python ./lib/audio-tools/align.py ${songPath} ${lyricsPath} --lang ${
        lang || "eng"
      }`;
      exec(cmd, (err, stdout) => {
        if (err) {
          return reject(err);
        }
        return resolve(stdout);
      });
    });
    const resultPathRegex = /\.\/results.*\.json/;
    const [resultPath] = result.match(resultPathRegex);
    const buf = fs.readFileSync(resultPath);

    const alignmentJSON = buf.toString("utf-8");
    const payload = {
      align: { ...JSON.parse(alignmentJSON) },
      audioUrl: `${ORIGIN}/uploads/${youtubeId}.wav`,
    };
    return res.status(200).json(payload);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Whoops");
  }
});

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
