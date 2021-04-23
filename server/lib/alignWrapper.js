const { exec } = require("child_process");

module.exports = (songPath, lyricsPath) =>
  new Promise((resolve, reject) => {
    const cmd = `python ../align.py ${songPath} ${lyricsPath}`;
    exec(cmd, (err, stdout) => {
      if (err) {
        return reject(err);
      }
      return resolve(stdout);
    });
  });
