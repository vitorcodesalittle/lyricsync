"""
This script takes a lyrics file (with sentences splitted in lines)
and outputs a file with words splitted in lines.
"""
import string
import os
import re
import sys

def getfileinfo(p):
    nodes = os.path.split(p)
    filename = nodes[-1]
    name, ext = filename.split('.')
    result = { 'name': name, 'extension': ext, 'path': p, 'directory': "".join(nodes[0:-1]) }
    return result

def getwords(text):
    replacements = {
        8217: "'", # weird apostrophe to '
    }
    remove = ['-','?','!',',','.', chr(8364), chr(8482), chr(8220)]
    h = {}
    keep = string.ascii_letters + 'âêôãáéúà'
    for c in text:
        h[ord(c)] = True
    text = ''.join([ replacements[ord(c)] if ord(c) in replacements else c for c in text if c not in remove])
    # print('after transform')
    # print(text)
    words = re.findall(r"[\w']+", text)
    return words

def create_words_file(inpath, outpath):
   with open(inpath, 'r') as f, open(outpath, 'w+') as o:
        data = f.read()
        words = getwords(data)
        o.write("\n".join(words))

def main():
    if len(sys.argv) < 2:
        raise Exception("Missing inpath arg")
    inpath = sys.argv[1]
    fileinfo = getfileinfo(inpath)
    outpath = os.path.join(fileinfo['directory'], fileinfo['name']+ '.words.txt')
    create_words_file(inpath, outpath)

if __name__ == '__main__':
    main()
