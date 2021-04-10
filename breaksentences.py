inpath = '.\\data\\avercage_embers.txt'
outpath = '.\\data\\avercage_embers.words.txt'

with open(inpath, 'r') as f, open(outpath, 'w+') as o:
    lines = f.readlines()
    words = []
    for l in lines:
        words = words + l.rstrip('\n').split(' ')
    words = [ w for w in words if len(w) > 0 ]
    o.write("\n".join(words))
