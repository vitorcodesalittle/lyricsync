$(document).ready(function() {
  var Karaoke = function() {
      this.$audioElem = $('#audioElement');
      this.$divLyrics = $('.lyrics');
      this.words = (JSON.parse(temp))["fragments"]
      console.log(this.words)
      console.log(getLyricsTimestampByWord(this.words, lyrics))
      this.lyrics = [
          { "end": "19", "start": "0", "text": "There is a house in New Orleans" },
          { "end": "24", "start": "19", "text": "They call the Rising Sun" },
          { "end": "31", "start": "25", "text": "And it's been the ruin of many a poor boy" },
          { "end": "36", "start": "31", "text": "And God I know I'm one" },

          { "end": "51", "start": "48", "text": "My mother was a tailor" },
          { "end": "58", "start": "54", "text": "She sewed my new bluejeans" },
          { "end": "66", "start": "60", "text": "My father was a gamblin' man" },
          { "end": "70", "start": "67", "text": "Down in New Orleans" },

          { "end": "87", "start": "81", "text": "Now the only thing a gambler needs" },
          { "end": "92", "start": "88", "text": "Is a suitcase and trunk" },
          { "end": "99", "start": "94", "text": "And the only time he's satisfied" },
          { "end": "104", "start": "99", "text": "Is when he's on, a drunk" },

          { "end": "152", "start": "149", "text": "Oh mother tell your children" },
          { "end": "158", "start": "154", "text": "Not to do what I have done" },
          { "end": "166", "start": "161", "text": "Spend your lives in sin and misery" },
          { "end": "171", "start": "167", "text": "In the House of the Rising Sun" },

          { "end": "187", "start": "182", "text": "Well, I got one foot on the platform" },
          { "end": "192", "start": "188", "text": "The other foot on the train" },
          { "end": "199", "start": "194", "text": "I'm goin' back to New Orleans" },
          { "end": "204", "start": "200", "text": "To wear that ball and chain" },

          { "end": "220", "start": "214", "text": "Well, there is a house in New Orleans" },
          { "end": "225", "start": "222", "text": "They call the Rising Sunn" },
          { "end": "232", "start": "227", "text": "And it's been the ruin of many a poor boy" },
          { "end": "237", "start": "232", "text": "And God I know I'm one" }	
      ];
      this.addLyricsInDom();
      this.run()
  };
  
  Karaoke.prototype.run = function(){
    this.svgLoader();
    this.timeupdate();
  };
  
  Karaoke.prototype.addLyricsInDom = function() {
      this.lyrics.map((item, i) => {
          let elem = document.createElement('li');
          let elemInner = document.createElement('span');
          elem.appendChild(elemInner).innerHTML = this.lyrics[i].text;
          this.$divLyrics.append(elem);
      })
  };

  Karaoke.prototype.svgLoader = function() {
    const getLengthOfDashoffset = document.querySelector('.progressValue').getTotalLength();
      const coef = getLengthOfDashoffset / this.lyrics[0].start;
      let i = 0;

      let gauge = setInterval(function() {
          i++
          $('.progressValue').css('strokeDashoffset', i * coef);
          if (i >= this.lyrics[0].start) {
              clearInterval(gauge);
              $('svg').fadeOut('slow');
              let audio = $('#audioElement')[0]
              console.log(audio)
              audio.play()
          }
      }.bind(this), 1000);
  };


  Karaoke.prototype.timeupdate = function() {
    var scrollHeight = 120;
       var previousIndex;
  this.$audioElem.on('timeupdate',function(e){
          this.lyrics.forEach(function(elem, index, array) {
              if (e.target.currentTime >= elem.start && e.target.currentTime <= elem.end) {
                      this.$divLyrics.children().eq(index).find('span').addClass('selected');
        
                  if (elem.end >= e.target.currentTime && index != 0) {

                       this.$divLyrics.children().eq(index - 1).find('span').addClass('resetlyricsStyle');
                       
                      if (index >= 3 && index != previousIndex) {
                          $("html,body").animate({ scrollTop: scrollHeight}, 1000);
                          scrollHeight += 120;
                      }
                      previousIndex = index;
                  }
              }
          }.bind(this));
}.bind(this))

  };
  
  $('#player').on('click', function(e) {
    new Karaoke();
  })

  function getLyricsTimestampByWord(words, lyrics) {
    let lyrics_arr = lyrics.split("\n") // Transform lyrics str to arr
    let result = []
    lyrics_arr.forEach(line => {
      let wordsInLine = line.split(" ") // Get words in line
      let lineFragments = words.splice(0, wordsInLine.length)
      let lineBegin = lineFragments[0].start
      let lineEnd   = lineFragments[lineFragments.length - 1].end
      let wordsTimestamp = lineFragments.map((lineFragment, index) => {
        return {
          word: wordsInLine[index],
          start: lineFragment.start,
          end: lineFragment.end
        }
      })
      result.push({
        start: lineBegin,
        end: lineEnd,
        words: wordsTimestamp
      })
    })
    return result
  }
  
  const temp = `{
    "fragments": [
     {
      "start": "0.000",
      "children": [],
      "end": "2.800",
      "id": "f000001",
      "language": "eng",
      "lines": [
       "Just"
      ]
     },
     {
      "start": "2.800",
      "children": [],
      "end": "2.960",
      "id": "f000002",
      "language": "eng",
      "lines": [
       "when"
      ]
     },
     {
      "start": "2.960",
      "children": [],
      "end": "3.240",
      "id": "f000003",
      "language": "eng",
      "lines": [
       "things"
      ]
     },
     {
      "start": "3.240",
      "children": [],
      "end": "3.520",
      "id": "f000004",
      "language": "eng",
      "lines": [
       "seem"
      ]
     },
     {
      "start": "3.520",
      "children": [],
      "end": "3.720",
      "id": "f000005",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "3.720",
      "children": [],
      "end": "4.040",
      "id": "f000006",
      "language": "eng",
      "lines": [
       "same"
      ]
     },
     {
      "start": "4.040",
      "children": [],
      "end": "4.160",
      "id": "f000007",
      "language": "eng",
      "lines": [
       "and"
      ]
     },
     {
      "start": "4.160",
      "children": [],
      "end": "4.360",
      "id": "f000008",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "4.360",
      "children": [],
      "end": "4.600",
      "id": "f000009",
      "language": "eng",
      "lines": [
       "whole"
      ]
     },
     {
      "start": "4.600",
      "children": [],
      "end": "4.960",
      "id": "f000010",
      "language": "eng",
      "lines": [
       "scene"
      ]
     },
     {
      "start": "4.960",
      "children": [],
      "end": "5.160",
      "id": "f000011",
      "language": "eng",
      "lines": [
       "is"
      ]
     },
     {
      "start": "5.160",
      "children": [],
      "end": "5.400",
      "id": "f000012",
      "language": "eng",
      "lines": [
       "lame"
      ]
     },
     {
      "start": "5.400",
      "children": [],
      "end": "5.520",
      "id": "f000013",
      "language": "eng",
      "lines": [
       "I"
      ]
     },
     {
      "start": "5.520",
      "children": [],
      "end": "5.560",
      "id": "f000014",
      "language": "eng",
      "lines": [
       "come"
      ]
     },
     {
      "start": "5.560",
      "children": [],
      "end": "5.880",
      "id": "f000015",
      "language": "eng",
      "lines": [
       "and"
      ]
     },
     {
      "start": "5.880",
      "children": [],
      "end": "6.040",
      "id": "f000016",
      "language": "eng",
      "lines": [
       "reign"
      ]
     },
     {
      "start": "6.040",
      "children": [],
      "end": "6.160",
      "id": "f000017",
      "language": "eng",
      "lines": [
       "with"
      ]
     },
     {
      "start": "6.160",
      "children": [],
      "end": "6.360",
      "id": "f000018",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "6.360",
      "children": [],
      "end": "6.880",
      "id": "f000019",
      "language": "eng",
      "lines": [
       "unexplained"
      ]
     },
     {
      "start": "6.880",
      "children": [],
      "end": "7.000",
      "id": "f000020",
      "language": "eng",
      "lines": [
       "For"
      ]
     },
     {
      "start": "7.000",
      "children": [],
      "end": "7.200",
      "id": "f000021",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "7.200",
      "children": [],
      "end": "7.560",
      "id": "f000022",
      "language": "eng",
      "lines": [
       "brains"
      ]
     },
     {
      "start": "7.560",
      "children": [],
      "end": "7.720",
      "id": "f000023",
      "language": "eng",
      "lines": [
       "'til"
      ]
     },
     {
      "start": "7.720",
      "children": [],
      "end": "8.040",
      "id": "f000024",
      "language": "eng",
      "lines": [
       "things"
      ]
     },
     {
      "start": "8.040",
      "children": [],
      "end": "8.360",
      "id": "f000025",
      "language": "eng",
      "lines": [
       "change"
      ]
     },
     {
      "start": "8.360",
      "children": [],
      "end": "8.600",
      "id": "f000026",
      "language": "eng",
      "lines": [
       "They"
      ]
     },
     {
      "start": "8.600",
      "children": [],
      "end": "9.080",
      "id": "f000027",
      "language": "eng",
      "lines": [
       "strain"
      ]
     },
     {
      "start": "9.080",
      "children": [],
      "end": "9.520",
      "id": "f000028",
      "language": "eng",
      "lines": [
       "to"
      ]
     },
     {
      "start": "9.520",
      "children": [],
      "end": "9.840",
      "id": "f000029",
      "language": "eng",
      "lines": [
       "sling"
      ]
     },
     {
      "start": "9.840",
      "children": [],
      "end": "10.000",
      "id": "f000030",
      "language": "eng",
      "lines": [
       "slang"
      ]
     },
     {
      "start": "10.000",
      "children": [],
      "end": "10.120",
      "id": "f000031",
      "language": "eng",
      "lines": [
       "I'm"
      ]
     },
     {
      "start": "10.120",
      "children": [],
      "end": "10.480",
      "id": "f000032",
      "language": "eng",
      "lines": [
       "trained"
      ]
     },
     {
      "start": "10.480",
      "children": [],
      "end": "10.720",
      "id": "f000033",
      "language": "eng",
      "lines": [
       "to"
      ]
     },
     {
      "start": "10.720",
      "children": [],
      "end": "11.000",
      "id": "f000034",
      "language": "eng",
      "lines": [
       "bring"
      ]
     },
     {
      "start": "11.000",
      "children": [],
      "end": "11.280",
      "id": "f000035",
      "language": "eng",
      "lines": [
       "game"
      ]
     },
     {
      "start": "11.280",
      "children": [],
      "end": "11.880",
      "id": "f000036",
      "language": "eng",
      "lines": [
       "History"
      ]
     },
     {
      "start": "11.880",
      "children": [],
      "end": "12.280",
      "id": "f000037",
      "language": "eng",
      "lines": [
       "that"
      ]
     },
     {
      "start": "12.280",
      "children": [],
      "end": "12.520",
      "id": "f000038",
      "language": "eng",
      "lines": [
       "I"
      ]
     },
     {
      "start": "12.520",
      "children": [],
      "end": "12.840",
      "id": "f000039",
      "language": "eng",
      "lines": [
       "arranged"
      ]
     },
     {
      "start": "12.840",
      "children": [],
      "end": "13.040",
      "id": "f000040",
      "language": "eng",
      "lines": [
       "been"
      ]
     },
     {
      "start": "13.040",
      "children": [],
      "end": "13.440",
      "id": "f000041",
      "language": "eng",
      "lines": [
       "regained"
      ]
     },
     {
      "start": "13.440",
      "children": [],
      "end": "13.680",
      "id": "f000042",
      "language": "eng",
      "lines": [
       "by"
      ]
     },
     {
      "start": "13.680",
      "children": [],
      "end": "13.960",
      "id": "f000043",
      "language": "eng",
      "lines": [
       "King"
      ]
     },
     {
      "start": "13.960",
      "children": [],
      "end": "14.360",
      "id": "f000044",
      "language": "eng",
      "lines": [
       "James"
      ]
     },
     {
      "start": "14.360",
      "children": [],
      "end": "14.760",
      "id": "f000045",
      "language": "eng",
      "lines": [
       "Go"
      ]
     },
     {
      "start": "14.760",
      "children": [],
      "end": "15.160",
      "id": "f000046",
      "language": "eng",
      "lines": [
       "to"
      ]
     },
     {
      "start": "15.160",
      "children": [],
      "end": "16.000",
      "id": "f000047",
      "language": "eng",
      "lines": [
       "practice"
      ]
     },
     {
      "start": "16.000",
      "children": [],
      "end": "16.200",
      "id": "f000048",
      "language": "eng",
      "lines": [
       "with"
      ]
     },
     {
      "start": "16.200",
      "children": [],
      "end": "16.720",
      "id": "f000049",
      "language": "eng",
      "lines": [
       "tactics"
      ]
     },
     {
      "start": "16.720",
      "children": [],
      "end": "17.120",
      "id": "f000050",
      "language": "eng",
      "lines": [
       "when"
      ]
     },
     {
      "start": "17.120",
      "children": [],
      "end": "17.120",
      "id": "f000051",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "17.120",
      "children": [],
      "end": "17.120",
      "id": "f000052",
      "language": "eng",
      "lines": [
       "track"
      ]
     },
     {
      "start": "17.120",
      "children": [],
      "end": "17.160",
      "id": "f000053",
      "language": "eng",
      "lines": [
       "hits"
      ]
     },
     {
      "start": "17.160",
      "children": [],
      "end": "17.480",
      "id": "f000054",
      "language": "eng",
      "lines": [
       "theatrics"
      ]
     },
     {
      "start": "17.480",
      "children": [],
      "end": "17.760",
      "id": "f000055",
      "language": "eng",
      "lines": [
       "Women"
      ]
     },
     {
      "start": "17.760",
      "children": [],
      "end": "18.040",
      "id": "f000056",
      "language": "eng",
      "lines": [
       "that"
      ]
     },
     {
      "start": "18.040",
      "children": [],
      "end": "18.120",
      "id": "f000057",
      "language": "eng",
      "lines": [
       "look"
      ]
     },
     {
      "start": "18.120",
      "children": [],
      "end": "18.360",
      "id": "f000058",
      "language": "eng",
      "lines": [
       "like"
      ]
     },
     {
      "start": "18.360",
      "children": [],
      "end": "18.880",
      "id": "f000059",
      "language": "eng",
      "lines": [
       "actresses"
      ]
     },
     {
      "start": "18.880",
      "children": [],
      "end": "19.120",
      "id": "f000060",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "19.120",
      "children": [],
      "end": "19.640",
      "id": "f000061",
      "language": "eng",
      "lines": [
       "status"
      ]
     },
     {
      "start": "19.640",
      "children": [],
      "end": "19.800",
      "id": "f000062",
      "language": "eng",
      "lines": [
       "of"
      ]
     },
     {
      "start": "19.800",
      "children": [],
      "end": "20.360",
      "id": "f000063",
      "language": "eng",
      "lines": [
       "Cleopatra's"
      ]
     },
     {
      "start": "20.360",
      "children": [],
      "end": "20.760",
      "id": "f000064",
      "language": "eng",
      "lines": [
       "Stacks"
      ]
     },
     {
      "start": "20.760",
      "children": [],
      "end": "20.880",
      "id": "f000065",
      "language": "eng",
      "lines": [
       "of"
      ]
     },
     {
      "start": "20.880",
      "children": [],
      "end": "21.600",
      "id": "f000066",
      "language": "eng",
      "lines": [
       "mathematics"
      ]
     },
     {
      "start": "21.600",
      "children": [],
      "end": "21.920",
      "id": "f000067",
      "language": "eng",
      "lines": [
       "to"
      ]
     },
     {
      "start": "21.920",
      "children": [],
      "end": "22.200",
      "id": "f000068",
      "language": "eng",
      "lines": [
       "feed"
      ]
     },
     {
      "start": "22.200",
      "children": [],
      "end": "22.400",
      "id": "f000069",
      "language": "eng",
      "lines": [
       "yo'"
      ]
     },
     {
      "start": "22.400",
      "children": [],
      "end": "23.080",
      "id": "f000070",
      "language": "eng",
      "lines": [
       "Asiatics"
      ]
     },
     {
      "start": "23.080",
      "children": [],
      "end": "23.360",
      "id": "f000071",
      "language": "eng",
      "lines": [
       "As"
      ]
     },
     {
      "start": "23.360",
      "children": [],
      "end": "23.480",
      "id": "f000072",
      "language": "eng",
      "lines": [
       "I"
      ]
     },
     {
      "start": "23.480",
      "children": [],
      "end": "23.800",
      "id": "f000073",
      "language": "eng",
      "lines": [
       "find"
      ]
     },
     {
      "start": "23.800",
      "children": [],
      "end": "23.880",
      "id": "f000074",
      "language": "eng",
      "lines": [
       "out"
      ]
     },
     {
      "start": "23.880",
      "children": [],
      "end": "24.000",
      "id": "f000075",
      "language": "eng",
      "lines": [
       "what"
      ]
     },
     {
      "start": "24.000",
      "children": [],
      "end": "24.200",
      "id": "f000076",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "24.200",
      "children": [],
      "end": "24.600",
      "id": "f000077",
      "language": "eng",
      "lines": [
       "facts"
      ]
     },
     {
      "start": "24.600",
      "children": [],
      "end": "24.760",
      "id": "f000078",
      "language": "eng",
      "lines": [
       "is"
      ]
     },
     {
      "start": "24.760",
      "children": [],
      "end": "25.160",
      "id": "f000079",
      "language": "eng",
      "lines": [
       "for"
      ]
     },
     {
      "start": "25.160",
      "children": [],
      "end": "25.640",
      "id": "f000080",
      "language": "eng",
      "lines": [
       "geographic"
      ]
     },
     {
      "start": "25.640",
      "children": [],
      "end": "25.840",
      "id": "f000081",
      "language": "eng",
      "lines": [
       "No"
      ]
     },
     {
      "start": "25.840",
      "children": [],
      "end": "26.280",
      "id": "f000082",
      "language": "eng",
      "lines": [
       "time"
      ]
     },
     {
      "start": "26.280",
      "children": [],
      "end": "26.360",
      "id": "f000083",
      "language": "eng",
      "lines": [
       "to"
      ]
     },
     {
      "start": "26.360",
      "children": [],
      "end": "26.680",
      "id": "f000084",
      "language": "eng",
      "lines": [
       "sip"
      ]
     },
     {
      "start": "26.680",
      "children": [],
      "end": "27.000",
      "id": "f000085",
      "language": "eng",
      "lines": [
       "Mo's"
      ]
     },
     {
      "start": "27.000",
      "children": [],
      "end": "27.320",
      "id": "f000086",
      "language": "eng",
      "lines": [
       "with"
      ]
     },
     {
      "start": "27.320",
      "children": [],
      "end": "27.680",
      "id": "f000087",
      "language": "eng",
      "lines": [
       "hostess"
      ]
     },
     {
      "start": "27.680",
      "children": [],
      "end": "27.720",
      "id": "f000088",
      "language": "eng",
      "lines": [
       "Never"
      ]
     },
     {
      "start": "27.720",
      "children": [],
      "end": "27.760",
      "id": "f000089",
      "language": "eng",
      "lines": [
       "mind"
      ]
     },
     {
      "start": "27.760",
      "children": [],
      "end": "27.840",
      "id": "f000090",
      "language": "eng",
      "lines": [
       "what"
      ]
     },
     {
      "start": "27.840",
      "children": [],
      "end": "28.040",
      "id": "f000091",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "28.040",
      "children": [],
      "end": "28.440",
      "id": "f000092",
      "language": "eng",
      "lines": [
       "total"
      ]
     },
     {
      "start": "28.440",
      "children": [],
      "end": "28.880",
      "id": "f000093",
      "language": "eng",
      "lines": [
       "gross"
      ]
     },
     {
      "start": "28.880",
      "children": [],
      "end": "29.160",
      "id": "f000094",
      "language": "eng",
      "lines": [
       "is"
      ]
     },
     {
      "start": "29.160",
      "children": [],
      "end": "29.320",
      "id": "f000095",
      "language": "eng",
      "lines": [
       "I"
      ]
     },
     {
      "start": "29.320",
      "children": [],
      "end": "29.480",
      "id": "f000096",
      "language": "eng",
      "lines": [
       "rip"
      ]
     },
     {
      "start": "29.480",
      "children": [],
      "end": "29.840",
      "id": "f000097",
      "language": "eng",
      "lines": [
       "shows"
      ]
     },
     {
      "start": "29.840",
      "children": [],
      "end": "30.000",
      "id": "f000098",
      "language": "eng",
      "lines": [
       "stay"
      ]
     },
     {
      "start": "30.000",
      "children": [],
      "end": "30.640",
      "id": "f000099",
      "language": "eng",
      "lines": [
       "focused"
      ]
     },
     {
      "start": "30.640",
      "children": [],
      "end": "30.680",
      "id": "f000100",
      "language": "eng",
      "lines": [
       "and"
      ]
     },
     {
      "start": "30.680",
      "children": [],
      "end": "31.040",
      "id": "f000101",
      "language": "eng",
      "lines": [
       "split"
      ]
     },
     {
      "start": "31.040",
      "children": [],
      "end": "31.400",
      "id": "f000102",
      "language": "eng",
      "lines": [
       "cheese"
      ]
     },
     {
      "start": "31.400",
      "children": [],
      "end": "31.480",
      "id": "f000103",
      "language": "eng",
      "lines": [
       "with"
      ]
     },
     {
      "start": "31.480",
      "children": [],
      "end": "32.080",
      "id": "f000104",
      "language": "eng",
      "lines": [
       "soldiers"
      ]
     },
     {
      "start": "32.080",
      "children": [],
      "end": "32.240",
      "id": "f000105",
      "language": "eng",
      "lines": [
       "While"
      ]
     },
     {
      "start": "32.240",
      "children": [],
      "end": "32.320",
      "id": "f000106",
      "language": "eng",
      "lines": [
       "you"
      ]
     },
     {
      "start": "32.320",
      "children": [],
      "end": "32.520",
      "id": "f000107",
      "language": "eng",
      "lines": [
       "hit"
      ]
     },
     {
      "start": "32.520",
      "children": [],
      "end": "32.960",
      "id": "f000108",
      "language": "eng",
      "lines": [
       "trees"
      ]
     },
     {
      "start": "32.960",
      "children": [],
      "end": "33.160",
      "id": "f000109",
      "language": "eng",
      "lines": [
       "and"
      ]
     },
     {
      "start": "33.160",
      "children": [],
      "end": "33.400",
      "id": "f000110",
      "language": "eng",
      "lines": [
       "coast"
      ]
     },
     {
      "start": "33.400",
      "children": [],
      "end": "33.480",
      "id": "f000111",
      "language": "eng",
      "lines": [
       "I"
      ]
     },
     {
      "start": "33.480",
      "children": [],
      "end": "33.520",
      "id": "f000112",
      "language": "eng",
      "lines": [
       "spit"
      ]
     },
     {
      "start": "33.520",
      "children": [],
      "end": "33.840",
      "id": "f000113",
      "language": "eng",
      "lines": [
       "flows"
      ]
     },
     {
      "start": "33.840",
      "children": [],
      "end": "33.960",
      "id": "f000114",
      "language": "eng",
      "lines": [
       "that"
      ]
     },
     {
      "start": "33.960",
      "children": [],
      "end": "34.240",
      "id": "f000115",
      "language": "eng",
      "lines": [
       "be"
      ]
     },
     {
      "start": "34.240",
      "children": [],
      "end": "35.040",
      "id": "f000116",
      "language": "eng",
      "lines": [
       "ferocious"
      ]
     },
     {
      "start": "35.040",
      "children": [],
      "end": "35.240",
      "id": "f000117",
      "language": "eng",
      "lines": [
       "And"
      ]
     },
     {
      "start": "35.240",
      "children": [],
      "end": "35.560",
      "id": "f000118",
      "language": "eng",
      "lines": [
       "with"
      ]
     },
     {
      "start": "35.560",
      "children": [],
      "end": "35.760",
      "id": "f000119",
      "language": "eng",
      "lines": [
       "these"
      ]
     },
     {
      "start": "35.760",
      "children": [],
      "end": "36.480",
      "id": "f000120",
      "language": "eng",
      "lines": [
       "explosives"
      ]
     },
     {
      "start": "36.480",
      "children": [],
      "end": "36.560",
      "id": "f000121",
      "language": "eng",
      "lines": [
       "I"
      ]
     },
     {
      "start": "36.560",
      "children": [],
      "end": "36.840",
      "id": "f000122",
      "language": "eng",
      "lines": [
       "split"
      ]
     },
     {
      "start": "36.840",
      "children": [],
      "end": "37.160",
      "id": "f000123",
      "language": "eng",
      "lines": [
       "seas"
      ]
     },
     {
      "start": "37.160",
      "children": [],
      "end": "37.280",
      "id": "f000124",
      "language": "eng",
      "lines": [
       "for"
      ]
     },
     {
      "start": "37.280",
      "children": [],
      "end": "37.920",
      "id": "f000125",
      "language": "eng",
      "lines": [
       "Moses"
      ]
     },
     {
      "start": "37.920",
      "children": [],
      "end": "38.320",
      "id": "f000126",
      "language": "eng",
      "lines": [
       "Shine"
      ]
     },
     {
      "start": "38.320",
      "children": [],
      "end": "38.960",
      "id": "f000127",
      "language": "eng",
      "lines": [
       "permanently"
      ]
     },
     {
      "start": "38.960",
      "children": [],
      "end": "39.320",
      "id": "f000128",
      "language": "eng",
      "lines": [
       "only"
      ]
     },
     {
      "start": "39.320",
      "children": [],
      "end": "39.520",
      "id": "f000129",
      "language": "eng",
      "lines": [
       "my"
      ]
     },
     {
      "start": "39.520",
      "children": [],
      "end": "39.800",
      "id": "f000130",
      "language": "eng",
      "lines": [
       "mind's"
      ]
     },
     {
      "start": "39.800",
      "children": [],
      "end": "40.280",
      "id": "f000131",
      "language": "eng",
      "lines": [
       "concernin'"
      ]
     },
     {
      "start": "40.280",
      "children": [],
      "end": "40.440",
      "id": "f000132",
      "language": "eng",
      "lines": [
       "me"
      ]
     },
     {
      "start": "40.440",
      "children": [],
      "end": "40.760",
      "id": "f000133",
      "language": "eng",
      "lines": [
       "Fire"
      ]
     },
     {
      "start": "40.760",
      "children": [],
      "end": "41.240",
      "id": "f000134",
      "language": "eng",
      "lines": [
       "burns"
      ]
     },
     {
      "start": "41.240",
      "children": [],
      "end": "41.360",
      "id": "f000135",
      "language": "eng",
      "lines": [
       "in"
      ]
     },
     {
      "start": "41.360",
      "children": [],
      "end": "41.600",
      "id": "f000136",
      "language": "eng",
      "lines": [
       "me"
      ]
     },
     {
      "start": "41.600",
      "children": [],
      "end": "42.280",
      "id": "f000137",
      "language": "eng",
      "lines": [
       "eternally"
      ]
     },
     {
      "start": "42.280",
      "children": [],
      "end": "42.720",
      "id": "f000138",
      "language": "eng",
      "lines": [
       "time's"
      ]
     },
     {
      "start": "42.720",
      "children": [],
      "end": "43.360",
      "id": "f000139",
      "language": "eng",
      "lines": [
       "eternity"
      ]
     },
     {
      "start": "43.360",
      "children": [],
      "end": "43.880",
      "id": "f000140",
      "language": "eng",
      "lines": [
       "Followers"
      ]
     },
     {
      "start": "43.880",
      "children": [],
      "end": "44.240",
      "id": "f000141",
      "language": "eng",
      "lines": [
       "turn"
      ]
     },
     {
      "start": "44.240",
      "children": [],
      "end": "44.520",
      "id": "f000142",
      "language": "eng",
      "lines": [
       "on"
      ]
     },
     {
      "start": "44.520",
      "children": [],
      "end": "44.840",
      "id": "f000143",
      "language": "eng",
      "lines": [
       "me"
      ]
     },
     {
      "start": "44.840",
      "children": [],
      "end": "45.200",
      "id": "f000144",
      "language": "eng",
      "lines": [
       "they'll"
      ]
     },
     {
      "start": "45.200",
      "children": [],
      "end": "45.400",
      "id": "f000145",
      "language": "eng",
      "lines": [
       "be"
      ]
     },
     {
      "start": "45.400",
      "children": [],
      "end": "45.400",
      "id": "f000146",
      "language": "eng",
      "lines": [
       "in"
      ]
     },
     {
      "start": "45.400",
      "children": [],
      "end": "45.440",
      "id": "f000147",
      "language": "eng",
      "lines": [
       "a"
      ]
     },
     {
      "start": "45.440",
      "children": [],
      "end": "46.400",
      "id": "f000148",
      "language": "eng",
      "lines": [
       "mental"
      ]
     },
     {
      "start": "46.400",
      "children": [],
      "end": "47.000",
      "id": "f000149",
      "language": "eng",
      "lines": [
       "infirmary"
      ]
     },
     {
      "start": "47.000",
      "children": [],
      "end": "47.080",
      "id": "f000150",
      "language": "eng",
      "lines": [
       "Determinedly"
      ]
     },
     {
      "start": "47.080",
      "children": [],
      "end": "47.520",
      "id": "f000151",
      "language": "eng",
      "lines": [
       "advance"
      ]
     },
     {
      "start": "47.520",
      "children": [],
      "end": "48.240",
      "id": "f000152",
      "language": "eng",
      "lines": [
       "technology"
      ]
     },
     {
      "start": "48.240",
      "children": [],
      "end": "48.560",
      "id": "f000153",
      "language": "eng",
      "lines": [
       "better"
      ]
     },
     {
      "start": "48.560",
      "children": [],
      "end": "49.080",
      "id": "f000154",
      "language": "eng",
      "lines": [
       "than"
      ]
     },
     {
      "start": "49.080",
      "children": [],
      "end": "49.440",
      "id": "f000155",
      "language": "eng",
      "lines": [
       "Germany"
      ]
     },
     {
      "start": "49.440",
      "children": [],
      "end": "49.640",
      "id": "f000156",
      "language": "eng",
      "lines": [
       "Since"
      ]
     },
     {
      "start": "49.640",
      "children": [],
      "end": "49.840",
      "id": "f000157",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "49.840",
      "children": [],
      "end": "50.080",
      "id": "f000158",
      "language": "eng",
      "lines": [
       "first"
      ]
     },
     {
      "start": "50.080",
      "children": [],
      "end": "50.440",
      "id": "f000159",
      "language": "eng",
      "lines": [
       "days"
      ]
     },
     {
      "start": "50.440",
      "children": [],
      "end": "50.720",
      "id": "f000160",
      "language": "eng",
      "lines": [
       "you"
      ]
     },
     {
      "start": "50.720",
      "children": [],
      "end": "50.920",
      "id": "f000161",
      "language": "eng",
      "lines": [
       "know"
      ]
     },
     {
      "start": "50.920",
      "children": [],
      "end": "51.040",
      "id": "f000162",
      "language": "eng",
      "lines": [
       "of"
      ]
     },
     {
      "start": "51.040",
      "children": [],
      "end": "51.200",
      "id": "f000163",
      "language": "eng",
      "lines": [
       "'til"
      ]
     },
     {
      "start": "51.200",
      "children": [],
      "end": "51.240",
      "id": "f000164",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "51.240",
      "children": [],
      "end": "51.600",
      "id": "f000165",
      "language": "eng",
      "lines": [
       "last"
      ]
     },
     {
      "start": "51.600",
      "children": [],
      "end": "51.800",
      "id": "f000166",
      "language": "eng",
      "lines": [
       "days"
      ]
     },
     {
      "start": "51.800",
      "children": [],
      "end": "52.000",
      "id": "f000167",
      "language": "eng",
      "lines": [
       "is"
      ]
     },
     {
      "start": "52.000",
      "children": [],
      "end": "52.320",
      "id": "f000168",
      "language": "eng",
      "lines": [
       "over"
      ]
     },
     {
      "start": "52.320",
      "children": [],
      "end": "52.440",
      "id": "f000169",
      "language": "eng",
      "lines": [
       "I"
      ]
     },
     {
      "start": "52.440",
      "children": [],
      "end": "52.840",
      "id": "f000170",
      "language": "eng",
      "lines": [
       "was"
      ]
     },
     {
      "start": "52.840",
      "children": [],
      "end": "53.360",
      "id": "f000171",
      "language": "eng",
      "lines": [
       "always"
      ]
     },
     {
      "start": "53.360",
      "children": [],
      "end": "53.640",
      "id": "f000172",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "53.640",
      "children": [],
      "end": "54.080",
      "id": "f000173",
      "language": "eng",
      "lines": [
       "flower"
      ]
     },
     {
      "start": "54.080",
      "children": [],
      "end": "54.200",
      "id": "f000174",
      "language": "eng",
      "lines": [
       "I"
      ]
     },
     {
      "start": "54.200",
      "children": [],
      "end": "54.440",
      "id": "f000175",
      "language": "eng",
      "lines": [
       "made"
      ]
     },
     {
      "start": "54.440",
      "children": [],
      "end": "54.760",
      "id": "f000176",
      "language": "eng",
      "lines": [
       "waves"
      ]
     },
     {
      "start": "54.760",
      "children": [],
      "end": "55.120",
      "id": "f000177",
      "language": "eng",
      "lines": [
       "for"
      ]
     },
     {
      "start": "55.120",
      "children": [],
      "end": "55.440",
      "id": "f000178",
      "language": "eng",
      "lines": [
       "Noah"
      ]
     },
     {
      "start": "55.440",
      "children": [],
      "end": "55.720",
      "id": "f000179",
      "language": "eng",
      "lines": [
       "From"
      ]
     },
     {
      "start": "55.720",
      "children": [],
      "end": "55.760",
      "id": "f000180",
      "language": "eng",
      "lines": [
       "a"
      ]
     },
     {
      "start": "55.760",
      "children": [],
      "end": "56.200",
      "id": "f000181",
      "language": "eng",
      "lines": [
       "compound"
      ]
     },
     {
      "start": "56.200",
      "children": [],
      "end": "56.440",
      "id": "f000182",
      "language": "eng",
      "lines": [
       "to"
      ]
     },
     {
      "start": "56.440",
      "children": [],
      "end": "56.640",
      "id": "f000183",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "56.640",
      "children": [],
      "end": "56.960",
      "id": "f000184",
      "language": "eng",
      "lines": [
       "anatomy"
      ]
     },
     {
      "start": "56.960",
      "children": [],
      "end": "57.040",
      "id": "f000185",
      "language": "eng",
      "lines": [
       "to"
      ]
     },
     {
      "start": "57.040",
      "children": [],
      "end": "57.200",
      "id": "f000186",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "57.200",
      "children": [],
      "end": "57.600",
      "id": "f000187",
      "language": "eng",
      "lines": [
       "breakdown"
      ]
     },
     {
      "start": "57.600",
      "children": [],
      "end": "57.840",
      "id": "f000188",
      "language": "eng",
      "lines": [
       "of"
      ]
     },
     {
      "start": "57.840",
      "children": [],
      "end": "57.960",
      "id": "f000189",
      "language": "eng",
      "lines": [
       "a"
      ]
     },
     {
      "start": "57.960",
      "children": [],
      "end": "58.320",
      "id": "f000190",
      "language": "eng",
      "lines": [
       "atom"
      ]
     },
     {
      "start": "58.320",
      "children": [],
      "end": "58.800",
      "id": "f000191",
      "language": "eng",
      "lines": [
       "Some"
      ]
     },
     {
      "start": "58.800",
      "children": [],
      "end": "58.960",
      "id": "f000192",
      "language": "eng",
      "lines": [
       "of"
      ]
     },
     {
      "start": "58.960",
      "children": [],
      "end": "59.320",
      "id": "f000193",
      "language": "eng",
      "lines": [
       "my"
      ]
     },
     {
      "start": "59.320",
      "children": [],
      "end": "59.400",
      "id": "f000194",
      "language": "eng",
      "lines": [
       "rap"
      ]
     },
     {
      "start": "59.400",
      "children": [],
      "end": "59.840",
      "id": "f000195",
      "language": "eng",
      "lines": [
       "patterns"
      ]
     },
     {
      "start": "59.840",
      "children": [],
      "end": "60.200",
      "id": "f000196",
      "language": "eng",
      "lines": [
       "still"
      ]
     },
     {
      "start": "60.200",
      "children": [],
      "end": "60.720",
      "id": "f000197",
      "language": "eng",
      "lines": [
       "surround"
      ]
     },
     {
      "start": "60.720",
      "children": [],
      "end": "61.120",
      "id": "f000198",
      "language": "eng",
      "lines": [
       "Saturn"
      ]
     },
     {
      "start": "61.120",
      "children": [],
      "end": "61.400",
      "id": "f000199",
      "language": "eng",
      "lines": [
       "From"
      ]
     },
     {
      "start": "61.400",
      "children": [],
      "end": "61.560",
      "id": "f000200",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "61.560",
      "children": [],
      "end": "61.880",
      "id": "f000201",
      "language": "eng",
      "lines": [
       "ancient"
      ]
     },
     {
      "start": "61.880",
      "children": [],
      "end": "62.760",
      "id": "f000202",
      "language": "eng",
      "lines": [
       "hieroglyphics"
      ]
     },
     {
      "start": "62.760",
      "children": [],
      "end": "62.880",
      "id": "f000203",
      "language": "eng",
      "lines": [
       "to"
      ]
     },
     {
      "start": "62.880",
      "children": [],
      "end": "63.240",
      "id": "f000204",
      "language": "eng",
      "lines": [
       "graffiti"
      ]
     },
     {
      "start": "63.240",
      "children": [],
      "end": "63.600",
      "id": "f000205",
      "language": "eng",
      "lines": [
       "painted"
      ]
     },
     {
      "start": "63.600",
      "children": [],
      "end": "64.080",
      "id": "f000206",
      "language": "eng",
      "lines": [
       "pictures"
      ]
     },
     {
      "start": "64.080",
      "children": [],
      "end": "64.200",
      "id": "f000207",
      "language": "eng",
      "lines": [
       "I"
      ]
     },
     {
      "start": "64.200",
      "children": [],
      "end": "64.680",
      "id": "f000208",
      "language": "eng",
      "lines": [
       "study"
      ]
     },
     {
      "start": "64.680",
      "children": [],
      "end": "64.840",
      "id": "f000209",
      "language": "eng",
      "lines": [
       "I"
      ]
     },
     {
      "start": "64.840",
      "children": [],
      "end": "65.000",
      "id": "f000210",
      "language": "eng",
      "lines": [
       "know"
      ]
     },
     {
      "start": "65.000",
      "children": [],
      "end": "65.080",
      "id": "f000211",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "65.080",
      "children": [],
      "end": "65.560",
      "id": "f000212",
      "language": "eng",
      "lines": [
       "scriptures"
      ]
     },
     {
      "start": "65.560",
      "children": [],
      "end": "65.720",
      "id": "f000213",
      "language": "eng",
      "lines": [
       "but"
      ]
     },
     {
      "start": "65.720",
      "children": [],
      "end": "66.120",
      "id": "f000214",
      "language": "eng",
      "lines": [
       "nowaday"
      ]
     },
     {
      "start": "66.120",
      "children": [],
      "end": "66.240",
      "id": "f000215",
      "language": "eng",
      "lines": [
       "ain't"
      ]
     },
     {
      "start": "66.240",
      "children": [],
      "end": "66.400",
      "id": "f000216",
      "language": "eng",
      "lines": [
       "it"
      ]
     },
     {
      "start": "66.400",
      "children": [],
      "end": "66.840",
      "id": "f000217",
      "language": "eng",
      "lines": [
       "vicious"
      ]
     },
     {
      "start": "66.840",
      "children": [],
      "end": "67.160",
      "id": "f000218",
      "language": "eng",
      "lines": [
       "Date"
      ]
     },
     {
      "start": "67.160",
      "children": [],
      "end": "67.640",
      "id": "f000219",
      "language": "eng",
      "lines": [
       "back"
      ]
     },
     {
      "start": "67.640",
      "children": [],
      "end": "67.720",
      "id": "f000220",
      "language": "eng",
      "lines": [
       "I"
      ]
     },
     {
      "start": "67.720",
      "children": [],
      "end": "68.000",
      "id": "f000221",
      "language": "eng",
      "lines": [
       "go"
      ]
     },
     {
      "start": "68.000",
      "children": [],
      "end": "68.480",
      "id": "f000222",
      "language": "eng",
      "lines": [
       "beyond"
      ]
     },
     {
      "start": "68.480",
      "children": [],
      "end": "68.640",
      "id": "f000223",
      "language": "eng",
      "lines": [
       "check"
      ]
     },
     {
      "start": "68.640",
      "children": [],
      "end": "68.880",
      "id": "f000224",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "68.880",
      "children": [],
      "end": "69.120",
      "id": "f000225",
      "language": "eng",
      "lines": [
       "oly"
      ]
     },
     {
      "start": "69.120",
      "children": [],
      "end": "69.760",
      "id": "f000226",
      "language": "eng",
      "lines": [
       "Qu'ran"
      ]
     },
     {
      "start": "69.760",
      "children": [],
      "end": "70.000",
      "id": "f000227",
      "language": "eng",
      "lines": [
       "To"
      ]
     },
     {
      "start": "70.000",
      "children": [],
      "end": "70.360",
      "id": "f000228",
      "language": "eng",
      "lines": [
       "speeches"
      ]
     },
     {
      "start": "70.360",
      "children": [],
      "end": "70.680",
      "id": "f000229",
      "language": "eng",
      "lines": [
       "at"
      ]
     },
     {
      "start": "70.680",
      "children": [],
      "end": "71.080",
      "id": "f000230",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "71.080",
      "children": [],
      "end": "71.400",
      "id": "f000231",
      "language": "eng",
      "lines": [
       "Audobon"
      ]
     },
     {
      "start": "71.400",
      "children": [],
      "end": "71.560",
      "id": "f000232",
      "language": "eng",
      "lines": [
       "now"
      ]
     },
     {
      "start": "71.560",
      "children": [],
      "end": "71.680",
      "id": "f000233",
      "language": "eng",
      "lines": [
       "we"
      ]
     },
     {
      "start": "71.680",
      "children": [],
      "end": "71.920",
      "id": "f000234",
      "language": "eng",
      "lines": [
       "get"
      ]
     },
     {
      "start": "71.920",
      "children": [],
      "end": "72.080",
      "id": "f000235",
      "language": "eng",
      "lines": [
       "our"
      ]
     },
     {
      "start": "72.080",
      "children": [],
      "end": "72.280",
      "id": "f000236",
      "language": "eng",
      "lines": [
       "party"
      ]
     },
     {
      "start": "72.280",
      "children": [],
      "end": "72.440",
      "id": "f000237",
      "language": "eng",
      "lines": [
       "on"
      ]
     },
     {
      "start": "72.440",
      "children": [],
      "end": "73.080",
      "id": "f000238",
      "language": "eng",
      "lines": [
       "So"
      ]
     },
     {
      "start": "73.080",
      "children": [],
      "end": "73.600",
      "id": "f000239",
      "language": "eng",
      "lines": [
       "bein'"
      ]
     },
     {
      "start": "73.600",
      "children": [],
      "end": "74.320",
      "id": "f000240",
      "language": "eng",
      "lines": [
       "beneficent"
      ]
     },
     {
      "start": "74.320",
      "children": [],
      "end": "74.400",
      "id": "f000241",
      "language": "eng",
      "lines": [
       "I"
      ]
     },
     {
      "start": "74.400",
      "children": [],
      "end": "74.560",
      "id": "f000242",
      "language": "eng",
      "lines": [
       "bless"
      ]
     },
     {
      "start": "74.560",
      "children": [],
      "end": "74.800",
      "id": "f000243",
      "language": "eng",
      "lines": [
       "'em"
      ]
     },
     {
      "start": "74.800",
      "children": [],
      "end": "75.040",
      "id": "f000244",
      "language": "eng",
      "lines": [
       "with"
      ]
     },
     {
      "start": "75.040",
      "children": [],
      "end": "75.960",
      "id": "f000245",
      "language": "eng",
      "lines": [
       "dialogue"
      ]
     },
     {
      "start": "75.960",
      "children": [],
      "end": "76.160",
      "id": "f000246",
      "language": "eng",
      "lines": [
       "They"
      ]
     },
     {
      "start": "76.160",
      "children": [],
      "end": "76.840",
      "id": "f000247",
      "language": "eng",
      "lines": [
       "expectin'"
      ]
     },
     {
      "start": "76.840",
      "children": [],
      "end": "76.960",
      "id": "f000248",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "76.960",
      "children": [],
      "end": "77.200",
      "id": "f000249",
      "language": "eng",
      "lines": [
       "next"
      ]
     },
     {
      "start": "77.200",
      "children": [],
      "end": "77.960",
      "id": "f000250",
      "language": "eng",
      "lines": [
       "testament"
      ]
     },
     {
      "start": "77.960",
      "children": [],
      "end": "78.160",
      "id": "f000251",
      "language": "eng",
      "lines": [
       "by"
      ]
     },
     {
      "start": "78.160",
      "children": [],
      "end": "78.240",
      "id": "f000252",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "78.240",
      "children": [],
      "end": "78.520",
      "id": "f000253",
      "language": "eng",
      "lines": [
       "God"
      ]
     },
     {
      "start": "78.520",
      "children": [],
      "end": "78.800",
      "id": "f000254",
      "language": "eng",
      "lines": [
       "I"
      ]
     },
     {
      "start": "78.800",
      "children": [],
      "end": "79.280",
      "id": "f000255",
      "language": "eng",
      "lines": [
       "roam"
      ]
     },
     {
      "start": "79.280",
      "children": [],
      "end": "79.520",
      "id": "f000256",
      "language": "eng",
      "lines": [
       "through"
      ]
     },
     {
      "start": "79.520",
      "children": [],
      "end": "79.760",
      "id": "f000257",
      "language": "eng",
      "lines": [
       "battle"
      ]
     },
     {
      "start": "79.760",
      "children": [],
      "end": "80.200",
      "id": "f000258",
      "language": "eng",
      "lines": [
       "zones"
      ]
     },
     {
      "start": "80.200",
      "children": [],
      "end": "80.400",
      "id": "f000259",
      "language": "eng",
      "lines": [
       "with"
      ]
     },
     {
      "start": "80.400",
      "children": [],
      "end": "80.840",
      "id": "f000260",
      "language": "eng",
      "lines": [
       "chrome"
      ]
     },
     {
      "start": "80.840",
      "children": [],
      "end": "81.120",
      "id": "f000261",
      "language": "eng",
      "lines": [
       "for"
      ]
     },
     {
      "start": "81.120",
      "children": [],
      "end": "81.640",
      "id": "f000262",
      "language": "eng",
      "lines": [
       "chaperone"
      ]
     },
     {
      "start": "81.640",
      "children": [],
      "end": "82.000",
      "id": "f000263",
      "language": "eng",
      "lines": [
       "Blast"
      ]
     },
     {
      "start": "82.000",
      "children": [],
      "end": "82.200",
      "id": "f000264",
      "language": "eng",
      "lines": [
       "beat"
      ]
     },
     {
      "start": "82.200",
      "children": [],
      "end": "82.320",
      "id": "f000265",
      "language": "eng",
      "lines": [
       "with"
      ]
     },
     {
      "start": "82.320",
      "children": [],
      "end": "83.080",
      "id": "f000266",
      "language": "eng",
      "lines": [
       "saxophones"
      ]
     },
     {
      "start": "83.080",
      "children": [],
      "end": "83.480",
      "id": "f000267",
      "language": "eng",
      "lines": [
       "one"
      ]
     },
     {
      "start": "83.480",
      "children": [],
      "end": "83.760",
      "id": "f000268",
      "language": "eng",
      "lines": [
       "of"
      ]
     },
     {
      "start": "83.760",
      "children": [],
      "end": "83.920",
      "id": "f000269",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "83.920",
      "children": [],
      "end": "84.240",
      "id": "f000270",
      "language": "eng",
      "lines": [
       "baddest"
      ]
     },
     {
      "start": "84.240",
      "children": [],
      "end": "84.560",
      "id": "f000271",
      "language": "eng",
      "lines": [
       "rappers"
      ]
     },
     {
      "start": "84.560",
      "children": [],
      "end": "84.640",
      "id": "f000272",
      "language": "eng",
      "lines": [
       "known"
      ]
     },
     {
      "start": "84.640",
      "children": [],
      "end": "84.840",
      "id": "f000273",
      "language": "eng",
      "lines": [
       "Every"
      ]
     },
     {
      "start": "84.840",
      "children": [],
      "end": "85.240",
      "id": "f000274",
      "language": "eng",
      "lines": [
       "country"
      ]
     },
     {
      "start": "85.240",
      "children": [],
      "end": "85.680",
      "id": "f000275",
      "language": "eng",
      "lines": [
       "city"
      ]
     },
     {
      "start": "85.680",
      "children": [],
      "end": "85.920",
      "id": "f000276",
      "language": "eng",
      "lines": [
       "and"
      ]
     },
     {
      "start": "85.920",
      "children": [],
      "end": "86.400",
      "id": "f000277",
      "language": "eng",
      "lines": [
       "borough"
      ]
     },
     {
      "start": "86.400",
      "children": [],
      "end": "87.000",
      "id": "f000278",
      "language": "eng",
      "lines": [
       "sidestreet"
      ]
     },
     {
      "start": "87.000",
      "children": [],
      "end": "87.160",
      "id": "f000279",
      "language": "eng",
      "lines": [
       "and"
      ]
     },
     {
      "start": "87.160",
      "children": [],
      "end": "87.480",
      "id": "f000280",
      "language": "eng",
      "lines": [
       "ghetto"
      ]
     },
     {
      "start": "87.480",
      "children": [],
      "end": "87.840",
      "id": "f000281",
      "language": "eng",
      "lines": [
       "Island"
      ]
     },
     {
      "start": "87.840",
      "children": [],
      "end": "88.000",
      "id": "f000282",
      "language": "eng",
      "lines": [
       "alley"
      ]
     },
     {
      "start": "88.000",
      "children": [],
      "end": "88.360",
      "id": "f000283",
      "language": "eng",
      "lines": [
       "and"
      ]
     },
     {
      "start": "88.360",
      "children": [],
      "end": "88.760",
      "id": "f000284",
      "language": "eng",
      "lines": [
       "meadow"
      ]
     },
     {
      "start": "88.760",
      "children": [],
      "end": "89.080",
      "id": "f000285",
      "language": "eng",
      "lines": [
       "theory's"
      ]
     },
     {
      "start": "89.080",
      "children": [],
      "end": "89.600",
      "id": "f000286",
      "language": "eng",
      "lines": [
       "thorough"
      ]
     },
     {
      "start": "89.600",
      "children": [],
      "end": "89.840",
      "id": "f000287",
      "language": "eng",
      "lines": [
       "enough"
      ]
     },
     {
      "start": "89.840",
      "children": [],
      "end": "90.040",
      "id": "f000288",
      "language": "eng",
      "lines": [
       "to"
      ]
     },
     {
      "start": "90.040",
      "children": [],
      "end": "90.360",
      "id": "f000289",
      "language": "eng",
      "lines": [
       "echo"
      ]
     },
     {
      "start": "90.360",
      "children": [],
      "end": "90.520",
      "id": "f000290",
      "language": "eng",
      "lines": [
       "When"
      ]
     },
     {
      "start": "90.520",
      "children": [],
      "end": "90.560",
      "id": "f000291",
      "language": "eng",
      "lines": [
       "it"
      ]
     },
     {
      "start": "90.560",
      "children": [],
      "end": "90.840",
      "id": "f000292",
      "language": "eng",
      "lines": [
       "was"
      ]
     },
     {
      "start": "90.840",
      "children": [],
      "end": "91.080",
      "id": "f000293",
      "language": "eng",
      "lines": [
       "one"
      ]
     },
     {
      "start": "91.080",
      "children": [],
      "end": "91.440",
      "id": "f000294",
      "language": "eng",
      "lines": [
       "mass"
      ]
     },
     {
      "start": "91.440",
      "children": [],
      "end": "91.560",
      "id": "f000295",
      "language": "eng",
      "lines": [
       "of"
      ]
     },
     {
      "start": "91.560",
      "children": [],
      "end": "91.920",
      "id": "f000296",
      "language": "eng",
      "lines": [
       "land"
      ]
     },
     {
      "start": "91.920",
      "children": [],
      "end": "92.240",
      "id": "f000297",
      "language": "eng",
      "lines": [
       "with"
      ]
     },
     {
      "start": "92.240",
      "children": [],
      "end": "92.560",
      "id": "f000298",
      "language": "eng",
      "lines": [
       "one"
      ]
     },
     {
      "start": "92.560",
      "children": [],
      "end": "92.880",
      "id": "f000299",
      "language": "eng",
      "lines": [
       "nat'"
      ]
     },
     {
      "start": "92.880",
      "children": [],
      "end": "92.960",
      "id": "f000300",
      "language": "eng",
      "lines": [
       "of"
      ]
     },
     {
      "start": "92.960",
      "children": [],
      "end": "93.320",
      "id": "f000301",
      "language": "eng",
      "lines": [
       "man"
      ]
     },
     {
      "start": "93.320",
      "children": [],
      "end": "93.360",
      "id": "f000302",
      "language": "eng",
      "lines": [
       "And"
      ]
     },
     {
      "start": "93.360",
      "children": [],
      "end": "93.600",
      "id": "f000303",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "93.600",
      "children": [],
      "end": "93.920",
      "id": "f000304",
      "language": "eng",
      "lines": [
       "whole"
      ]
     },
     {
      "start": "93.920",
      "children": [],
      "end": "94.320",
      "id": "f000305",
      "language": "eng",
      "lines": [
       "mass"
      ]
     },
     {
      "start": "94.320",
      "children": [],
      "end": "94.520",
      "id": "f000306",
      "language": "eng",
      "lines": [
       "was"
      ]
     },
     {
      "start": "94.520",
      "children": [],
      "end": "94.880",
      "id": "f000307",
      "language": "eng",
      "lines": [
       "ran"
      ]
     },
     {
      "start": "94.880",
      "children": [],
      "end": "95.160",
      "id": "f000308",
      "language": "eng",
      "lines": [
       "under"
      ]
     },
     {
      "start": "95.160",
      "children": [],
      "end": "95.440",
      "id": "f000309",
      "language": "eng",
      "lines": [
       "one"
      ]
     },
     {
      "start": "95.440",
      "children": [],
      "end": "95.880",
      "id": "f000310",
      "language": "eng",
      "lines": [
       "master"
      ]
     },
     {
      "start": "95.880",
      "children": [],
      "end": "96.200",
      "id": "f000311",
      "language": "eng",
      "lines": [
       "plan"
      ]
     },
     {
      "start": "96.200",
      "children": [],
      "end": "96.480",
      "id": "f000312",
      "language": "eng",
      "lines": [
       "Since"
      ]
     },
     {
      "start": "96.480",
      "children": [],
      "end": "96.680",
      "id": "f000313",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "96.680",
      "children": [],
      "end": "97.080",
      "id": "f000314",
      "language": "eng",
      "lines": [
       "world's"
      ]
     },
     {
      "start": "97.080",
      "children": [],
      "end": "98.040",
      "id": "f000315",
      "language": "eng",
      "lines": [
       "metamorphis"
      ]
     },
     {
      "start": "98.040",
      "children": [],
      "end": "98.160",
      "id": "f000316",
      "language": "eng",
      "lines": [
       "and"
      ]
     },
     {
      "start": "98.160",
      "children": [],
      "end": "98.280",
      "id": "f000317",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "98.280",
      "children": [],
      "end": "98.560",
      "id": "f000318",
      "language": "eng",
      "lines": [
       "planet's"
      ]
     },
     {
      "start": "98.560",
      "children": [],
      "end": "98.760",
      "id": "f000319",
      "language": "eng",
      "lines": [
       "kept"
      ]
     },
     {
      "start": "98.760",
      "children": [],
      "end": "98.920",
      "id": "f000320",
      "language": "eng",
      "lines": [
       "in"
      ]
     },
     {
      "start": "98.920",
      "children": [],
      "end": "99.400",
      "id": "f000321",
      "language": "eng",
      "lines": [
       "orbit"
      ]
     },
     {
      "start": "99.400",
      "children": [],
      "end": "100.000",
      "id": "f000322",
      "language": "eng",
      "lines": [
       "Turntables"
      ]
     },
     {
      "start": "100.000",
      "children": [],
      "end": "100.120",
      "id": "f000323",
      "language": "eng",
      "lines": [
       "we"
      ]
     },
     {
      "start": "100.120",
      "children": [],
      "end": "100.400",
      "id": "f000324",
      "language": "eng",
      "lines": [
       "spin"
      ]
     },
     {
      "start": "100.400",
      "children": [],
      "end": "100.760",
      "id": "f000325",
      "language": "eng",
      "lines": [
       "awkward"
      ]
     },
     {
      "start": "100.760",
      "children": [],
      "end": "100.880",
      "id": "f000326",
      "language": "eng",
      "lines": [
       "but"
      ]
     },
     {
      "start": "100.880",
      "children": [],
      "end": "101.280",
      "id": "f000327",
      "language": "eng",
      "lines": [
       "needles"
      ]
     },
     {
      "start": "101.280",
      "children": [],
      "end": "101.560",
      "id": "f000328",
      "language": "eng",
      "lines": [
       "never"
      ]
     },
     {
      "start": "101.560",
      "children": [],
      "end": "101.880",
      "id": "f000329",
      "language": "eng",
      "lines": [
       "skip"
      ]
     },
     {
      "start": "101.880",
      "children": [],
      "end": "102.120",
      "id": "f000330",
      "language": "eng",
      "lines": [
       "off"
      ]
     },
     {
      "start": "102.120",
      "children": [],
      "end": "102.240",
      "id": "f000331",
      "language": "eng",
      "lines": [
       "it"
      ]
     },
     {
      "start": "102.240",
      "children": [],
      "end": "102.760",
      "id": "f000332",
      "language": "eng",
      "lines": [
       "Rhythms"
      ]
     },
     {
      "start": "102.760",
      "children": [],
      "end": "102.920",
      "id": "f000333",
      "language": "eng",
      "lines": [
       "we"
      ]
     },
     {
      "start": "102.920",
      "children": [],
      "end": "103.600",
      "id": "f000334",
      "language": "eng",
      "lines": [
       "expressin'"
      ]
     },
     {
      "start": "103.600",
      "children": [],
      "end": "103.920",
      "id": "f000335",
      "language": "eng",
      "lines": [
       "similar"
      ]
     },
     {
      "start": "103.920",
      "children": [],
      "end": "104.200",
      "id": "f000336",
      "language": "eng",
      "lines": [
       "to"
      ]
     },
     {
      "start": "104.200",
      "children": [],
      "end": "104.280",
      "id": "f000337",
      "language": "eng",
      "lines": [
       "our"
      ]
     },
     {
      "start": "104.280",
      "children": [],
      "end": "105.200",
      "id": "f000338",
      "language": "eng",
      "lines": [
       "ancestors"
      ]
     },
     {
      "start": "105.200",
      "children": [],
      "end": "105.600",
      "id": "f000339",
      "language": "eng",
      "lines": [
       "It'll"
      ]
     },
     {
      "start": "105.600",
      "children": [],
      "end": "105.960",
      "id": "f000340",
      "language": "eng",
      "lines": [
       "answer"
      ]
     },
     {
      "start": "105.960",
      "children": [],
      "end": "106.120",
      "id": "f000341",
      "language": "eng",
      "lines": [
       "your"
      ]
     },
     {
      "start": "106.120",
      "children": [],
      "end": "106.560",
      "id": "f000342",
      "language": "eng",
      "lines": [
       "questions"
      ]
     },
     {
      "start": "106.560",
      "children": [],
      "end": "106.760",
      "id": "f000343",
      "language": "eng",
      "lines": [
       "if"
      ]
     },
     {
      "start": "106.760",
      "children": [],
      "end": "106.920",
      "id": "f000344",
      "language": "eng",
      "lines": [
       "you"
      ]
     },
     {
      "start": "106.920",
      "children": [],
      "end": "107.600",
      "id": "f000345",
      "language": "eng",
      "lines": [
       "understand"
      ]
     },
     {
      "start": "107.600",
      "children": [],
      "end": "107.720",
      "id": "f000346",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "107.720",
      "children": [],
      "end": "108.000",
      "id": "f000347",
      "language": "eng",
      "lines": [
       "message"
      ]
     },
     {
      "start": "108.000",
      "children": [],
      "end": "108.200",
      "id": "f000348",
      "language": "eng",
      "lines": [
       "From"
      ]
     },
     {
      "start": "108.200",
      "children": [],
      "end": "108.320",
      "id": "f000349",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "108.320",
      "children": [],
      "end": "108.400",
      "id": "f000350",
      "language": "eng",
      "lines": [
       "days"
      ]
     },
     {
      "start": "108.400",
      "children": [],
      "end": "108.600",
      "id": "f000351",
      "language": "eng",
      "lines": [
       "of"
      ]
     },
     {
      "start": "108.600",
      "children": [],
      "end": "108.720",
      "id": "f000352",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "108.720",
      "children": [],
      "end": "109.120",
      "id": "f000353",
      "language": "eng",
      "lines": [
       "slave"
      ]
     },
     {
      "start": "109.120",
      "children": [],
      "end": "109.680",
      "id": "f000354",
      "language": "eng",
      "lines": [
       "topics"
      ]
     },
     {
      "start": "109.680",
      "children": [],
      "end": "109.840",
      "id": "f000355",
      "language": "eng",
      "lines": [
       "to"
      ]
     },
     {
      "start": "109.840",
      "children": [],
      "end": "110.000",
      "id": "f000356",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "110.000",
      "children": [],
      "end": "110.080",
      "id": "f000357",
      "language": "eng",
      "lines": [
       "new"
      ]
     },
     {
      "start": "110.080",
      "children": [],
      "end": "110.440",
      "id": "f000358",
      "language": "eng",
      "lines": [
       "age"
      ]
     },
     {
      "start": "110.440",
      "children": [],
      "end": "110.640",
      "id": "f000359",
      "language": "eng",
      "lines": [
       "of"
      ]
     },
     {
      "start": "110.640",
      "children": [],
      "end": "111.120",
      "id": "f000360",
      "language": "eng",
      "lines": [
       "prophets"
      ]
     },
     {
      "start": "111.120",
      "children": [],
      "end": "111.240",
      "id": "f000361",
      "language": "eng",
      "lines": [
       "As"
      ]
     },
     {
      "start": "111.240",
      "children": [],
      "end": "111.640",
      "id": "f000362",
      "language": "eng",
      "lines": [
       "heavy"
      ]
     },
     {
      "start": "111.640",
      "children": [],
      "end": "111.800",
      "id": "f000363",
      "language": "eng",
      "lines": [
       "as"
      ]
     },
     {
      "start": "111.800",
      "children": [],
      "end": "112.240",
      "id": "f000364",
      "language": "eng",
      "lines": [
       "hiphop"
      ]
     },
     {
      "start": "112.240",
      "children": [],
      "end": "112.440",
      "id": "f000365",
      "language": "eng",
      "lines": [
       "is"
      ]
     },
     {
      "start": "112.440",
      "children": [],
      "end": "112.640",
      "id": "f000366",
      "language": "eng",
      "lines": [
       "I'm"
      ]
     },
     {
      "start": "112.640",
      "children": [],
      "end": "112.960",
      "id": "f000367",
      "language": "eng",
      "lines": [
       "always"
      ]
     },
     {
      "start": "112.960",
      "children": [],
      "end": "113.280",
      "id": "f000368",
      "language": "eng",
      "lines": [
       "ready"
      ]
     },
     {
      "start": "113.280",
      "children": [],
      "end": "113.480",
      "id": "f000369",
      "language": "eng",
      "lines": [
       "to"
      ]
     },
     {
      "start": "113.480",
      "children": [],
      "end": "113.720",
      "id": "f000370",
      "language": "eng",
      "lines": [
       "drop"
      ]
     },
     {
      "start": "113.720",
      "children": [],
      "end": "113.920",
      "id": "f000371",
      "language": "eng",
      "lines": [
       "it"
      ]
     },
     {
      "start": "113.920",
      "children": [],
      "end": "114.120",
      "id": "f000372",
      "language": "eng",
      "lines": [
       "From"
      ]
     },
     {
      "start": "114.120",
      "children": [],
      "end": "114.280",
      "id": "f000373",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "114.280",
      "children": [],
      "end": "114.640",
      "id": "f000374",
      "language": "eng",
      "lines": [
       "mind"
      ]
     },
     {
      "start": "114.640",
      "children": [],
      "end": "114.840",
      "id": "f000375",
      "language": "eng",
      "lines": [
       "which"
      ]
     },
     {
      "start": "114.840",
      "children": [],
      "end": "114.960",
      "id": "f000376",
      "language": "eng",
      "lines": [
       "is"
      ]
     },
     {
      "start": "114.960",
      "children": [],
      "end": "115.240",
      "id": "f000377",
      "language": "eng",
      "lines": [
       "one"
      ]
     },
     {
      "start": "115.240",
      "children": [],
      "end": "115.520",
      "id": "f000378",
      "language": "eng",
      "lines": [
       "of"
      ]
     },
     {
      "start": "115.520",
      "children": [],
      "end": "115.960",
      "id": "f000379",
      "language": "eng",
      "lines": [
       "Allah's"
      ]
     },
     {
      "start": "115.960",
      "children": [],
      "end": "116.280",
      "id": "f000380",
      "language": "eng",
      "lines": [
       "best"
      ]
     },
     {
      "start": "116.280",
      "children": [],
      "end": "116.840",
      "id": "f000381",
      "language": "eng",
      "lines": [
       "designs"
      ]
     },
     {
      "start": "116.840",
      "children": [],
      "end": "116.960",
      "id": "f000382",
      "language": "eng",
      "lines": [
       "And"
      ]
     },
     {
      "start": "116.960",
      "children": [],
      "end": "117.400",
      "id": "f000383",
      "language": "eng",
      "lines": [
       "mines'll"
      ]
     },
     {
      "start": "117.400",
      "children": [],
      "end": "117.920",
      "id": "f000384",
      "language": "eng",
      "lines": [
       "stand"
      ]
     },
     {
      "start": "117.920",
      "children": [],
      "end": "118.000",
      "id": "f000385",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "118.000",
      "children": [],
      "end": "118.560",
      "id": "f000386",
      "language": "eng",
      "lines": [
       "test"
      ]
     },
     {
      "start": "118.560",
      "children": [],
      "end": "118.680",
      "id": "f000387",
      "language": "eng",
      "lines": [
       "of"
      ]
     },
     {
      "start": "118.680",
      "children": [],
      "end": "118.800",
      "id": "f000388",
      "language": "eng",
      "lines": [
       "time"
      ]
     },
     {
      "start": "118.800",
      "children": [],
      "end": "118.840",
      "id": "f000389",
      "language": "eng",
      "lines": [
       "when"
      ]
     },
     {
      "start": "118.840",
      "children": [],
      "end": "118.840",
      "id": "f000390",
      "language": "eng",
      "lines": [
       "I"
      ]
     },
     {
      "start": "118.840",
      "children": [],
      "end": "119.040",
      "id": "f000391",
      "language": "eng",
      "lines": [
       "rhyme"
      ]
     },
     {
      "start": "119.040",
      "children": [],
      "end": "119.040",
      "id": "f000392",
      "language": "eng",
      "lines": [
       "The"
      ]
     },
     {
      "start": "119.040",
      "children": [],
      "end": "119.040",
      "id": "f000393",
      "language": "eng",
      "lines": [
       "18th"
      ]
     },
     {
      "start": "119.040",
      "children": [],
      "end": "119.040",
      "id": "f000394",
      "language": "eng",
      "lines": [
       "Letter"
      ]
     },
     {
      "start": "119.040",
      "children": [],
      "end": "119.040",
      "id": "f000395",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "119.040",
      "children": [],
      "end": "119.040",
      "id": "f000396",
      "language": "eng",
      "lines": [
       "prophecy"
      ]
     },
     {
      "start": "119.040",
      "children": [],
      "end": "119.160",
      "id": "f000397",
      "language": "eng",
      "lines": [
       "professor"
      ]
     },
     {
      "start": "119.160",
      "children": [],
      "end": "119.160",
      "id": "f000398",
      "language": "eng",
      "lines": [
       "I"
      ]
     },
     {
      "start": "119.160",
      "children": [],
      "end": "119.160",
      "id": "f000399",
      "language": "eng",
      "lines": [
       "stay"
      ]
     },
     {
      "start": "119.160",
      "children": [],
      "end": "119.320",
      "id": "f000400",
      "language": "eng",
      "lines": [
       "clever"
      ]
     },
     {
      "start": "119.320",
      "children": [],
      "end": "119.600",
      "id": "f000401",
      "language": "eng",
      "lines": [
       "long"
      ]
     },
     {
      "start": "119.600",
      "children": [],
      "end": "119.880",
      "id": "f000402",
      "language": "eng",
      "lines": [
       "as"
      ]
     },
     {
      "start": "119.880",
      "children": [],
      "end": "120.080",
      "id": "f000403",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "120.080",
      "children": [],
      "end": "120.440",
      "id": "f000404",
      "language": "eng",
      "lines": [
       "planet"
      ]
     },
     {
      "start": "120.440",
      "children": [],
      "end": "120.680",
      "id": "f000405",
      "language": "eng",
      "lines": [
       "stay"
      ]
     },
     {
      "start": "120.680",
      "children": [],
      "end": "120.840",
      "id": "f000406",
      "language": "eng",
      "lines": [
       "together"
      ]
     },
     {
      "start": "120.840",
      "children": [],
      "end": "120.880",
      "id": "f000407",
      "language": "eng",
      "lines": [
       "Bring"
      ]
     },
     {
      "start": "120.880",
      "children": [],
      "end": "121.000",
      "id": "f000408",
      "language": "eng",
      "lines": [
       "up"
      ]
     },
     {
      "start": "121.000",
      "children": [],
      "end": "121.280",
      "id": "f000409",
      "language": "eng",
      "lines": [
       "praise"
      ]
     },
     {
      "start": "121.280",
      "children": [],
      "end": "121.560",
      "id": "f000410",
      "language": "eng",
      "lines": [
       "from"
      ]
     },
     {
      "start": "121.560",
      "children": [],
      "end": "121.880",
      "id": "f000411",
      "language": "eng",
      "lines": [
       "Mecca"
      ]
     },
     {
      "start": "121.880",
      "children": [],
      "end": "122.000",
      "id": "f000412",
      "language": "eng",
      "lines": [
       "make"
      ]
     },
     {
      "start": "122.000",
      "children": [],
      "end": "122.000",
      "id": "f000413",
      "language": "eng",
      "lines": [
       "a"
      ]
     },
     {
      "start": "122.000",
      "children": [],
      "end": "122.080",
      "id": "f000414",
      "language": "eng",
      "lines": [
       "phrase"
      ]
     },
     {
      "start": "122.080",
      "children": [],
      "end": "122.480",
      "id": "f000415",
      "language": "eng",
      "lines": [
       "for"
      ]
     },
     {
      "start": "122.480",
      "children": [],
      "end": "122.920",
      "id": "f000416",
      "language": "eng",
      "lines": [
       "the"
      ]
     },
     {
      "start": "122.920",
      "children": [],
      "end": "123.160",
      "id": "f000417",
      "language": "eng",
      "lines": [
       "better"
      ]
     },
     {
      "start": "123.160",
      "children": [],
      "end": "123.160",
      "id": "f000418",
      "language": "eng",
      "lines": [
       "In"
      ]
     },
     {
      "start": "123.160",
      "children": [],
      "end": "123.160",
      "id": "f000419",
      "language": "eng",
      "lines": [
       "new"
      ]
     },
     {
      "start": "123.160",
      "children": [],
      "end": "123.200",
      "id": "f000420",
      "language": "eng",
      "lines": [
       "days"
      ]
     },
     {
      "start": "123.200",
      "children": [],
      "end": "123.200",
      "id": "f000421",
      "language": "eng",
      "lines": [
       "to"
      ]
     },
     {
      "start": "123.200",
      "children": [],
      "end": "123.520",
      "id": "f000422",
      "language": "eng",
      "lines": [
       "remember"
      ]
     },
     {
      "start": "123.520",
      "children": [],
      "end": "123.520",
      "id": "f000423",
      "language": "eng",
      "lines": [
       "always"
      ]
     },
     {
      "start": "123.520",
      "children": [],
      "end": "123.520",
      "id": "f000424",
      "language": "eng",
      "lines": [
       "and"
      ]
     },
     {
      "start": "123.520",
      "children": [],
      "end": "123.520",
      "id": "f000425",
      "language": "eng",
      "lines": [
       "forever"
      ]
     },
     {
      "start": "123.520",
      "children": [],
      "end": "123.520",
      "id": "f000426",
      "language": "eng",
      "lines": [
       "The"
      ]
     },
     {
      "start": "123.520",
      "children": [],
      "end": "123.520",
      "id": "f000427",
      "language": "eng",
      "lines": [
       "R"
      ]
     },
     {
      "start": "123.520",
      "children": [],
      "end": "126.000",
      "id": "f000428",
      "language": "eng",
      "lines": [
       "baby"
      ]
     }
    ]
   }`

   const lyrics = `Just when things seem the same, and the whole scene is lame
I come and reign with the unexplained
For the brains 'til things change
They strain to sling slang, I'm trained to bring game
History that I arranged been regained by King James
Go to practice with tactics, when the track hits, theatrics
Women that look like actresses, the status of Cleopatra's
Stacks of mathematics to feed yo' Asiatics
As I find out, what the facts is, for geographic
No time to sip Mo's with hostess
Never mind what the total gross is
I rip shows, stay focused, and split cheese with soldiers
While you hit trees and coast, I spit flows that be ferocious
And with these explosives, I split seas for Moses
Shine permanently, only my mind's concernin' me
Fire burns in me eternally, time's eternity
Followers turn on me, they'll be in a mental infirmary
Determinedly advance technology better than Germany
Since the first days you know of, 'til the last days is over
I was always the flow-er, I made waves for Noah
From a compound, to the anatomy, to the breakdown of a atom
Some of my rap patterns still surround Saturn
From the ancient hieroglyphics, to graffiti painted pictures
I study, I know the scriptures, but nowaday ain't it vicious?
Date back, I go beyond, check the oly Qu'ran
To speeches at the Audobon, now we get our party on
So bein' beneficent, I bless 'em with dialogue
They expectin' the next testament by the God
I roam through battle zones with chrome for chaperone
Blast beat with saxophones, one of the baddest rappers known
Every country, city and borough, side-street and ghetto
Island, alley and meadow, theory's thorough enough to echo
When it was one mass of land, with one nat' of man
And the whole mass was ran under one master plan
Since the world's metamorphis, and the planet's kept in orbit
Turntables, we spin awkward but needles never skip off it
Rhythms we expressin' similar to our ancestors
It'll answer your questions if you understand the message
From the days of the slave topics, to the new age of prophets
As heavy as hip-hop is, I'm always ready to drop it
From the mind which is one of Allah's best designs
And mines'll stand the test of time, when I rhyme
The 18th Letter, the prophecy professor
I stay clever, long as the planet stay together
Bring up praise from Mecca, make a phrase for the better
In new days to remember, always and forever
The R, baby`
});