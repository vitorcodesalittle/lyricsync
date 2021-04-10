"""
This script takes a lyrics file (with sentences splitted in lines)
and outputs a file with words splitted in lines.
"""
import re

inpath = '.\\data\\avercage_embers.txt'
outpath = '.\\data\\avercage_embers.words.txt'

replacements = {
    8217: "'" # weird apostrophe to '
}
remove = ['-']
with open(inpath, 'r') as f, open(outpath, 'w+') as o:
    data = f.read()
    data = ''.join([ replacements[ord(c)] if ord(c) in replacements else c for c in data if c not in remove])
    words = re.findall(r"[\w']+", data)
    o.write("\n".join(words))

