import json
from pydub import AudioSegment

f = open('results/map.json')
sync_result = json.load(f)

song = AudioSegment.from_wav("data/the_18th_letter.wav")
secs = 1000
chunks = []
for fragment in sync_result["fragments"]:
  print(fragment)
  chunk = AudioSegment.empty()
  chunk = song[ float(fragment["begin"]) * secs: float(fragment["end"]) * secs]
  chunks.append({
    'chunk': chunk,
    'lines': fragment["lines"]
  })

