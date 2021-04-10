import json
import sys
from pydub import AudioSegment
from pydub.playback import play

f = open('results/map.json')
sync_result = json.load(f)

song = AudioSegment.from_wav("data/the_18th_letter.wav")
secs = 1000
chunks = []
for fragment in sync_result["fragments"]:
  print(fragment)
  chunk = AudioSegment.empty()
  begin = fragment["begin"]
  end = fragment["end"]
  if begin == end:
      print("Jumping fragment because it's empty")
      continue
  chunk = song[ float(begin) * secs: float(end) * secs]
  chunks.append({
    'chunk': chunk,
    'lines': fragment["lines"]
  })
  print(fragment["lines"])
  try:
      play(chunk)
  except Exception:
      print("Error playing audio chunk")
      traceback = sys.exc_info()[2]
      print(sys.exc_info()[1])
      print(traceback.print_tb())



