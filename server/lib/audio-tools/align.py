"""
This script is a shortcut for using spleeter and aeneas on some .wav and .txt
"""
import os
from subprocess import Popen, PIPE
import argparse
import breaksentences

def parseargs():
    parser = argparse.ArgumentParser(description='Sync lyrics with music')
    parser.add_argument('audiopath', metavar='audiopath', type=str, help="path to the music file in .wav")
    parser.add_argument('lyricspath', metavar='lyricspath', type=str, help="path to the music file in .wav")
    parser.add_argument('--cmdprefix', metavar='cmdprefix', type=str, help="Whateve prefix you need to add to \"spleeter separete ...\" to run spleeter and aeneas")
    parser.add_argument('--lang', metavar='lang', default="eng", type=str, help="The language of your song (portuguese is \"por\") default is \"eng\"")
    parser.add_argument('--outformat', metavar='lang', default="json", type=str, help="The format of your output, default is \"json\"")
    args = parser.parse_args()
    return vars(args)

def spleeter_separate(inpath, outpath, prefix=None):
    args = {
        '-o': outpath
    }
    cmdargs = ['spleeter', 'separate']
    if prefix != None:
        cmdargs = [prefix] + cmdargs
    cmdargs = cmdargs + [inpath]
    for key, value in args.items():
        cmdargs.append(key)
        cmdargs.append(value)
    print(">>", " ".join(cmdargs))
    with Popen(cmdargs, stdout=PIPE, shell=True) as proc:
        output = proc.stdout.read()
        print(output)

def aeneas_align(audio_inputpath, lyrics_inputpath, outpath, language, format):
    optionsstring="task_language=" + language + "|os_task_file_format=" + format +  "|is_text_type=plain"
    cmdargs = ['python', '-m', 'aeneas.tools.execute_task', audio_inputpath, lyrics_inputpath, '"' + optionsstring + '"', outpath, '--skip-validator', '--presets-word']
    print(">>", " ".join(cmdargs))
    with Popen(cmdargs, stdout=PIPE, shell=True) as proc:
        output = proc.stdout.read()
        print(output)

def break_sentence(inpath):
    fileinfo = getfileinfo(inpath)
    outpath = os.path.join(fileinfo['directory'], fileinfo['name']+ '.words.txt')
    create_words_file(inpath, outpath)
    return outpath

args = parseargs()
audiopath = args['audiopath']
lyricspath = args['lyricspath']
cmdprefix = args['cmdprefix']
language = args['lang']
outformat = args['outformat']
spleeteroutpath = './out/'
aeneasoutpath = './results'
_, audio_filename = os.path.split(audiopath)
audioname, audiotype = audio_filename.split('.')
splits_dir = audio_filename.split('.')[0] # spleeter outputs vocals.wav into <outpath arg>/<audio name>

spleeter_separate(inpath=audiopath, outpath=spleeteroutpath, prefix=cmdprefix)

wordsoutpath = break_sentence(inpath=lyricspath)

aeneas_align(
    audio_inputpath=os.path.join(spleeteroutpath, splits_dir, 'vocals.wav'),
    lyrics_inputpath=wordsoutpath,
    outpath=os.path.join( aeneasoutpath, "{0:}_align.{1:}".format(audioname, outformat)),
    language=language,
    format=outformat
)
