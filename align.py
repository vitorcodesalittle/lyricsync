"""
This script is a shortcut for using spleeter and aeneas on some .wav and .txt
"""
import sys
import os
from subprocess import Popen, PIPE
import shlex
import argparse
from pathlib import Path

def parseargs():
    parser = argparse.ArgumentParser(description='Sync lyrics with music')
    parser.add_argument('audiopath', metavar='audiopath', type=str, help="path to the music file in .wav")
    parser.add_argument('lyricspath', metavar='lyricspath', type=str, help="path to the music file in .wav")
    parser.add_argument('--cmdprefix', metavar='cmdprefix', type=str, help="Whateve prefix you need to add to \"spleeter separete ...\" to run spleeter and aeneas")
    args = parser.parse_args()
    return vars(args)

def spleeter_separate(inpath, outpath, prefix=None, posfix=None):
    args = {
        '-o': outpath
    }
    cmdargs = ['spleeter', 'separate']
    if prefix != None:
        cmdargs = [prefix] + cmdargs
    if posfix != None:
        cmdargs = cmdargs + [posfix]
    cmdargs = cmdargs + [inpath]
    for key, value in args.items():
        cmdargs.append(key)
        cmdargs.append(value)
    print(">>", " ".join(cmdargs))
    with Popen(cmdargs, stdout=PIPE, shell=True) as proc:
        output = proc.stdout.read()
        print(output)

def aeneas_align(audio_inputpath, lyrics_inputpath, outpath, optionsstring="task_language=eng|os_task_file_format=json|is_text_type=plain"):
    cmdargs = ['python', '-m', 'aeneas.tools.execute_task', audio_inputpath, lyrics_inputpath, '"' + optionsstring + '"', outpath, '--skip-validator']
    print(">>", " ".join(cmdargs))
    with Popen(cmdargs, stdout=PIPE, shell=True) as proc:
        output = proc.stdout.read()
        print(output)

args = parseargs()
audiopath = args['audiopath']
lyricspath = args['lyricspath']
cmdprefix = args['cmdprefix']
spleeteroutpath = './out/'

_, audio_filename = os.path.split(audiopath)
splits_dir = audio_filename.split('.')[0] # spleeter outputs vocals.wav into <outpath arg>/<audio name>
spleeter_separate(inpath=audiopath, outpath=spleeteroutpath, prefix=cmdprefix)
aeneas_align(audio_inputpath=os.path.join(spleeteroutpath, splits_dir, 'vocals.wav'), lyrics_inputpath=lyricspath, outpath="map.json")


