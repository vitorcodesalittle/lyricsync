import json
from aeneas.plotter import Plotter, PlotWaveform, PlotLabelset
from aeneas.audiofile import AudioFile

# www.readbeyond.it/aeneas/docs/plotter.html 

audio_file = '.\data\\the_18th_letter.wav'
json_file = '.\map.json'

print("AUDIO FILE: " + audio_file)
print("JSON FILE: " + json_file)

f = open(json_file, 'r')
json_str = "".join(f.readlines())
j = json.loads(json_str)

def get_tripples(j):
    result = []
    fragments = j['fragments']
    for f in fragments:
        result.append((float(f["begin"]), float(f["end"]), f["id"]))
    return result

tripples = get_tripples(j)

print(tripples)

# Plotting waveform
audio = AudioFile(audio_file)
waveform = PlotWaveform(audio)
print(waveform)

# Plotting labels




