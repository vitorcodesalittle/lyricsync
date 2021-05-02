var Karaoke = function (lyrics, fragments) {
  this.$audioElem = $("#audioElement");
  this.$divLyrics = $(".lyrics");
  this.fragments = fragments;
  this.lyrics = getLyricsTimestampByWord(this.fragments, lyrics);
  this.addLyricsInDom();
  this.run();
};

Karaoke.prototype.run = function () {
  this.svgLoader();
  this.timeupdate();
};

Karaoke.prototype.addLyricsInDom = function () {
  this.lyrics.map((item, i) => {
    let li = document.createElement("li");
    item.words.forEach((word, wordIndex) => {
      let elem = document.createElement("span");
      elem.className = "index" + wordIndex;
      elem.innerHTML = word.text;
      li.append(elem);
    });
    this.$divLyrics.append(li);
  });
};

Karaoke.prototype.setFragments = function (fragments) {
  this.fragments = fragments;
};
Karaoke.prototype.setLyrics = function (lyrics) {
  this.lyrics = lyrics;
};

Karaoke.prototype.svgLoader = function () {
  const getLengthOfDashoffset = document
    .querySelector(".progressValue")
    .getTotalLength();
  const coef = getLengthOfDashoffset / this.lyrics[0].start;
  let i = 0;

  let gauge = setInterval(
    function () {
      i++;
      $(".progressValue").css("strokeDashoffset", i * coef);
      if (i >= this.lyrics[0].start) {
        clearInterval(gauge);
        $("svg").fadeOut("slow");
        let audio = $("#audioElement")[0];
        console.log(audio);
        audio.play();
      }
    }.bind(this),
    1000
  );
};

Karaoke.prototype.timeupdate = function () {
  var scrollHeight = 120;
  var previousIndexLine;
  this.$audioElem.on(
    "timeupdate",
    function (e) {
      this.lyrics.forEach(
        function (elem, indexLine, array) {
          let divLyrics = this.$divLyrics.children();
          if (
            e.target.currentTime >= elem.start &&
            e.target.currentTime <= elem.end
          ) {
            divLyrics.eq(indexLine).find("span").addClass("selected");

            if (elem.end >= e.target.currentTime && indexLine != 0) {
              divLyrics
                .eq(indexLine - 1)
                .find("span")
                .addClass("resetlyricsStyle");

              if (indexLine >= 3 && indexLine != previousIndexLine) {
                $("html,body").animate({ scrollTop: scrollHeight }, 1000);
                scrollHeight += 120;
              }
              previousIndexLine = indexLine;
            }

            elem.words.forEach(function (word, indexWord) {
              if (
                e.target.currentTime >= word.start &&
                e.target.currentTime <= word.end
              ) {
                let li = divLyrics.eq(indexLine);
                let span = li["0"].querySelector(`.index${indexWord}`);
                span.classList.add("wordSelected");
              }
            });
          }
        }.bind(this)
      );
    }.bind(this)
  );
};

function getLyricsTimestampByWord(fragments, lyrics) {
  let lyrics_arr = lyrics.split("\n"); // Transform lyrics str to arr
  let result = [];
  lyrics_arr.forEach((line) => {
    if ($.trim(line).length == 0) {
      return;
    }
    let wordsInLine = line.split(" ").filter((w) => !!w);
    let lineFragments = fragments.splice(0, wordsInLine.length);
    let lineBegin = lineFragments[0].start;
    let lineEnd = lineFragments[lineFragments.length - 1].end;
    let wordsTimestamp = lineFragments.map((lineFragment, index) => {
      return {
        text: wordsInLine[index],
        start: lineFragment.start,
        end: lineFragment.end,
      };
    });
    result.push({
      start: lineBegin,
      end: lineEnd,
      words: wordsTimestamp,
    });
  });
  return result;
}
function submitForm(event) {
  // @type {[File]}
  var youtube_url = $("#youtube_url_input").val();
  var lang = $("#lang_input").val();
  var lyrics = $("#lyrics_input").val();
  if (!lyrics || !youtube_url.trim()) {
    alert("You must submit audio file and lyrics cant be empty");
    return;
  }
  const form = new FormData();
  form.append("lyrics", lyrics);
  form.append("song", youtube_url);
  form.append("lang", lang);

  fetch("/align", {
    method: "post",
    body: form,
  })
    .then((res) => res.json())
    .then((res) => {
      const { align, audioUrl } = res;
      document.querySelector("source").src = audioUrl;
      document.querySelector("audio").load();
      return align;
    })
    .then((data) => data.fragments.map((th) => ({ ...th, start: th.begin })))
    .then((fragments) => {
      $(".container").css({ display: "none" });
      $(".progress").css({ display: "flex" });
      new Karaoke(lyrics, fragments);
    })
    .catch(console.error);
}
$(document).ready(function () {});
