"""
    This script converts audio to .wav
    Currently converts:
    - mp3
"""
import sys
from os import path
from pydub import AudioSegment

if len(sys.argv) < 2:
    raise Exception("Missing file path as argument")

inpath = sys.argv[1]

def getfileinfo(p):
    nodes = path.split(p)
    filename = nodes[-1]
    name, ext = filename.split('.')
    result = { 'name': name, 'extension': ext, 'path': p, 'directory': "".join(nodes[0:-1]) }
    return result

fileinfo = getfileinfo(inpath)

if fileinfo['extension'] == 'mp3':
    sound = AudioSegment.from_mp3(fileinfo['path'])
    sound.export(path.join(fileinfo['directory'],fileinfo['name'] + '.wav'), format="wav")
else:
    raise Exception("Unknown source file type " + fileinfo['extension'])
