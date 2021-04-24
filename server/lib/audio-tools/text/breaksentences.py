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
    name = filename.split('.')[0]
    ext = filename.split('.')[1]
    result = { 'name': name, 'extension': ext, 'path': p, 'directory': "".join(nodes[0:-1]) }
    return result

def getwords(text):
    replacements = {
        8217: "'", # weird apostrophe to '
    }
    remove = ['-','?','!',',','.', chr(8364), chr(8482), chr(8220),'1','2','3','4','5','6','7','8','9','0']
    text = ''.join([ replacements[ord(c)] if ord(c) in replacements else c for c in text if c not in remove])
    # print('after transform')
    # print(text)
    words = re.findall(r"[\w']+", text)
    return words


def create_words_file(inpath, outpath):
   with open(inpath, 'r', encoding='utf-8') as f, open(outpath, 'w+', encoding="utf-8") as o:
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
